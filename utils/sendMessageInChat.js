const { default: axios } = require("axios");

export const sendMessageInChat = async (message, setChatLog, setIsLoading, setFailTofetchMessage) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    };
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };
    setChatLog((prev) => [...prev, { type: "user", message: message }]);
    setIsLoading(true);

    await axios
      .post(url, data, { headers: headers })
      .then((response) => {
        console.log(response);
        setChatLog((prev) => [
          ...prev,
          // { type: "user", message: message },
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error :: " + error);
        document.getElementById('my_modal_4').showModal();
        setFailTofetchMessage(true);
      });
  };