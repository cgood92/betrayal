export const config = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
  ],
};

export const constraints = {
  video: true,
};
