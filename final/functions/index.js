const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {Timestamp} = require("firebase-admin/firestore");
const Permit = require("permitio").Permit;

admin.initializeApp();

const permit = new Permit({
  token:
    "YOUR_PERMIT_TOKEN",
  pdp: "http://localhost:7766",
});

// Cloud Function to sync user to Permit.io
exports.syncUser = functions.auth.user().onCreate(async (user) => {
  const newUser = {
    key: user.uid,
    email: user.email,
  };

  try {
    // Sync the user to Permit
    await permit.api.createUser(newUser);
    await permit.api.assignRole({
      role: "viewer",
      tenant: "default",
      user: user.uid,
    });

    console.info("User synced successfully to Permit");
  } catch (error) {
    console.error("Error syncing user to Permit. ==> ", error);
  }
});

// Cloud Function to check user permission
exports.checkPermission = functions.https.onCall(async (data) => {
  const {userId, operation, key} = data;

  // Validate input parameters
  if (!userId || !operation || !key) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing required parameters.",
    );
  }

  try {
    // Check the user's permission for the operation in the specified room key
    const permitted = await permit.check(userId, operation, {
      type: "room",
      key,
      tenant: "default",
    });

    if (permitted) {
      console.info("User is PERMITTED for the operation");
      return {permitted: true};
    } else {
      console.info("User is NOT PERMITTED for the operation");
      return {permitted: false};
    }
  } catch (error) {
    throw new functions.https.HttpsError(
        "internal",
        "Error occurred while checking user permission.",
    );
  }
});

// Cloud Function to send a message
exports.sendMessage = functions.https.onCall(async (data, context) => {
  const {chatRoomId, message} = data;

  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "Request not authenticated.",
    );
  }

  const user = context.auth;

  try {
    // Check if the user has permission to send a message
    const isPermitted = await permit.check(user.uid, "create", {
      type: "room",
      key: chatRoomId,
      tenant: "default",
    });

    if (!isPermitted) {
      throw new functions.https.HttpsError(
          "permission-denied",
          "User does not have permission to send messages in this chat room.",
      );
    }

    // Add the message to Firestore if permitted
    await admin.firestore().collection(`chatRooms/${chatRoomId}/messages`).add({
      text: message,
      name: user.token.name,
      avatar: user.token.picture,
      createdAt: Timestamp.now(),
      uid: user.uid,
    });

    return {success: true, message: "Message sent successfully."};
  } catch (error) {
    console.error("Error sending message:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Error occurred while sending the message.",
    );
  }
});

// Cloud Function to delete a message
exports.deleteMessage = functions.https.onCall(async (data, context) => {
  const {chatRoomId, messageId} = data;

  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "Request not authenticated.",
    );
  }

  const userId = context.auth.uid;

  try {
    // Check if the user is permitted to delete the message
    const isModerator = await permit.check(userId, "delete", {
      type: "room",
      key: chatRoomId,
      tenant: "default",
    });

    if (isModerator) {
      await admin
          .firestore()
          .doc(`chatRooms/${chatRoomId}/messages/${messageId}`)
          .delete();
      return {success: true, message: "Message deleted successfully."};
    } else {
      throw new functions.https.HttpsError(
          "permission-denied",
          "User does not have permission to delete this message.",
      );
    }
  } catch (error) {
    throw new functions.https.HttpsError(
        "internal",
        "Error occurred while deleting the message.",
    );
  }
});
