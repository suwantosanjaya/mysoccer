const webPush = require('web-push');

const vapidKeys = {
    publicKey: "BJWpyorYJ9UnywNsj6OCCLLhsC4hZfAX1I6VzrP9qh534zrrsBt3bMKthYqgVgi0sx-lgRhgsXPdQt8s9eUl8N8",
    privateKey: "fhMcapqm5CcgCAN7UN5_OjSiCHVF0NhFX_lktPHYLSk"
};

webPush.setVapidDetails(
    'mailto:suwantosanjaya@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/eNuyfxP648M:APA91bGntJEO3-NzfQs1XrYfBSxmdG2Pyrx3ZBkU0s9gezdWIAKaXlCIZWc5-mCUCGuJfUn475Wh_08ZL5YA6h8fVa8XZMHvqM5SedewRGkMlm0PVJnu-eYO9bdogJvVAA3WvNarufcz",
    keys: {
        p256dh: "BCklQ31mdS6FpPKoXFm/S54PUxnx9Z2ZDnQdIXnsBWu3oEf5fAN6IpCGT0QNWnb1rfpMfJ5kYFdiydHYEvy34Aw=",
        auth: "mCl/1jd4OiVZVkHlkB7yAw=="
    }
};

const payload = 'Anda menerima push notifikasi!';

const options = {
    gcmAPIKey: '902206291033',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);