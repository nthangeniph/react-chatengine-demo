export const notMe = (chatConfig, selectedChat) => {
    return selectedChat.people.find(p => p.person?.username !== chatConfig?.username)?.person?.username;
};