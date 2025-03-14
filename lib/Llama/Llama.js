const Together = require("together-ai");

const together = new Together({
    apiKey: "6bd0ecb5eea31e13b49acf03759fc24e8bbb4e71da4050fb41e00ba399c29685"
});

const Llama_chatbot = async (userMessage) => {
    const response = await together.chat.completions.create({
        messages: [{"role": "user", "content": userMessage}],
        model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
        max_tokens: null,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["<|eot_id|>","<|eom_id|>"],
        stream: true
    });
    let res = "";
    for await (const token of response) {
        res += token.choices[0]?.delta?.content;
    }
    return res;
}


export default Llama_chatbot;