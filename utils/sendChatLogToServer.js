

const summarizeChatLog=(chatLogData, ignoreList)=>{
    const userMessages = chatLogData.filter((entry) => entry.type === 'user' && !ignoreList.includes(entry.message));
    const summary = userMessages.map((entry) => entry.message);
    return summary.join(' ');
  }

  export const sendChatLogToServer = async (userId, chatLogData,setChatLog, fetchedChatLog, setChatSave, setSendChatFlag) => {
    const greetingsToIgnore = ['Hi', 'Hello', 'Hey'];
    const chatSummary = summarizeChatLog(chatLogData, greetingsToIgnore);
    const hasBotMessage = chatLogData.some((message) => message.type === 'bot');
    if (!hasBotMessage) {
      console.error('Chat log does not contain a "bot" message. Not sending data.');
      setChatSave(false);
      document.getElementById('my_modal_4').showModal();
      return;
    }

    const doesSummaryNameExist = fetchedChatLog.some(
        (chatLog) => chatLog.summaryName === chatSummary
      );
    if(doesSummaryNameExist) { 
        console.error(' chat log already exist');
        setSendChatFlag(true)
        document.getElementById('my_modal_4').showModal();
        return 
    }

    try {
      const response = await fetch(`/api/chatlog`, {
        method: "PATCH",
        headers:{ 'Content-Type': 'application/json', },
        body: JSON.stringify({ userId, chatLogData, chatSummary }),
      });
      if (response.ok) {
        console.log('Chat log saved successfully');
        setChatSave(true);
        document.getElementById('my_modal_4').showModal();
        setChatLog("");
        // setOpenModel(!openModel);
      } else {
        console.error('Failed to save chat log');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };