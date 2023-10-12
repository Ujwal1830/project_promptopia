export const fetchChatLogFromServer = async (userId)=>{
    if(!userId) return null;
    try {
      const response = await fetch(`/api/chatlog/${userId}`)
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error)
    }
  }