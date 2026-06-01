const API_KEY = "YOUR_API_KEY";

async function sendMessage(){

    const input =
    document.getElementById("user-input");

    const message =
    input.value.trim();

    if(!message) return;

    const chatBox =
    document.getElementById("chat-box");

    const userDiv =
    document.createElement("div");

    userDiv.className =
    "message user";

    userDiv.textContent =
    message;

    chatBox.appendChild(userDiv);

    input.value = "";

    const typingDiv =
    document.createElement("div");

    typingDiv.className =
    "message bot";

    typingDiv.id = "typing";

    typingDiv.textContent =
    "Thinking...";

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop =
    chatBox.scrollHeight;

    try{

        const response =
        await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={YOUR-API-KEY}`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    contents:[
                        {
                            parts:[
                                {
                                    text:message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data =
        await response.json();

        document
        .getElementById("typing")
        ?.remove();

        console.log(data);

        if(!response.ok){

            const errorDiv =
            document.createElement("div");

            errorDiv.className =
            "message bot";

            errorDiv.textContent =
            data.error?.message ||
            "API Error";

            chatBox.appendChild(errorDiv);

            return;
        }

        const botReply =
        data?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text ||
        "No response received.";

        const botDiv =
        document.createElement("div");

        botDiv.className =
        "message bot";

        botDiv.textContent =
        botReply;

        chatBox.appendChild(botDiv);

    }
    catch(error){

        document
        .getElementById("typing")
        ?.remove();

        const errorDiv =
        document.createElement("div");

        errorDiv.className =
        "message bot";

        errorDiv.textContent =
        "Connection failed.";

        chatBox.appendChild(errorDiv);

        console.error(error);
    }

    chatBox.scrollTop =
    chatBox.scrollHeight;
}

document
.getElementById("user-input")
.addEventListener(
    "keydown",
    function(e){

        if(e.key === "Enter"){
            sendMessage();
        }
    }
);
