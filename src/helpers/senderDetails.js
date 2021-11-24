export const senderDetails = (chatConfig, selectedChat) => {
  return selectedChat.people.find(
    p => p.person?.username !== chatConfig?.username,
  );
};
