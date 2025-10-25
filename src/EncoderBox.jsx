import { useState } from "react";
import "./styles.css";

export default function EncoderBox() {
    const [text, setText] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState(-1); // 0 = encode, 1 = decode
    const [error, setError] = useState("");
    const [knowMore, setKnowMore] = useState(false);

    const keypad = {
        abc: "2",
        def: "3",
        ghi: "4",
        jkl: "5",
        mno: "6",
        pqrs: "7",
        tuv: "8",
        wxyz: "9",
        " ": " ",
    };

    // ---------- Encoder ----------
    const encode = (str) => {
        let out = "";
        for (const ch of str.toLowerCase()) {
            for (const key of Object.keys(keypad)) {
                if (key.includes(ch)) {
                    const repeatCount = key.indexOf(ch) + 1;
                    out += keypad[key].repeat(repeatCount) + "|";
                    break;
                }
            }
        }
        return out;
    };

    // ---------- Decoder ----------
    const decode = (str) => {
        const parts = str.split("|");
        if (parts[parts.length - 1] === "") parts.pop();

        let out = "";
        for (const part of parts) {
            const n = part.length;
            const d = part[0];
            for (const [key, val] of Object.entries(keypad)) {
                if (val === d) {
                    out += key.charAt(n - 1);
                    break;
                }
            }
        }
        return out;
    };

    // ---------- Input pattern check ----------
    const isEncodedPattern = (str) => /^[2-9| ]+$/.test(str);
    const isDecodedPattern = (str) => /^[a-zA-Z ]+$/.test(str);

    // ---------- Know More handler ----------
    const handleKnow = () => {
        setKnowMore(!knowMore);
    };

    // ---------- Event handlers ----------
    const handleEncode = () => {
        setError("");
        setOutput("");
        if (text.trim() === "") {
            setError("Please enter a message first.");
            return;
        }
        if (isEncodedPattern(text.trim())) {
            setError("This message looks already encoded.");
            return;
        }
        setMode(0);
        setOutput(encode(text));
    };

    const handleDecode = () => {
        setError("");
        setOutput("");
        if (text.trim() === "") {
            setError("Please enter a message first.");
            return;
        }
        if (isDecodedPattern(text.trim())) {
            setError("This message looks already decoded.");
            return;
        }
        setMode(1);
        setOutput(decode(text));
    };

    const handleCopy = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            alert("Copied!");
        }
    };

    return (
        <>
            <h2>Encoder / Decoder</h2>
            <br /><br /><br />
            <div className="explanation" style={{ fontSize: '1.5rem' }} >
                Encode your messages like a tech wizard. Fast, sleek, and mysterious.
                <br /><br />
                <p style={{ fontSize: '1.5rem' }}>Your text. Your rules. Your glow-up.</p></div>
            <br /><br />
            <div className="encoder-box">
                <div className="textspace">
                    <p>Type your message below:</p>
                    <textarea
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            setError("");
                        }}
                        rows="8"
                        cols="50"
                    />
                </div>

                <div className="btns">
                    <button onClick={handleEncode}>Encode</button>
                    <button onClick={handleDecode}>Decode</button>
                    <button onClick={handleCopy}>Copy</button>
                </div>


                <div className="outputbox">
                    {error && <div className="error-box">{error}</div>}

                    <h3>
                        {mode === 0 ? "Encoded Message:" : mode === 1 ? "Decoded Message:" : ""}
                    </h3>

                    <div className="displayMsg">{output}</div>
                </div>
                <div className="btns know">
                    <button onClick={handleKnow}>{knowMore == true ? "Know Less" : "Know More"}</button>


                    {knowMore &&
                        <div className="explanation">
                            <br /><br />
                            <h3>How the Encoding Works</h3>
                            <p>
                                Remember the old mobile phones where you had to press a key multiple times to type a letter? That’s exactly how this encoder works.
                            </p>
                            <p>
                                Each letter is mapped to a number, just like a classic phone keypad:
                            </p>
                            <p>
                                <span className="key">2</span> → A, B, C<br />
                                <span className="key">3</span> → D, E, F<br />
                                <span className="key">4</span> → G, H, I<br />
                                <span className="key">5</span> → J, K, L<br />
                                <span className="key">6</span> → M, N, O<br />
                                <span className="key">7</span> → P, Q, R, S<br />
                                <span className="key">8</span> → T, U, V<br />
                                <span className="key">9</span> → W, X, Y, Z
                            </p>
                            <p>
                                When you click <strong>Encode</strong>, your text is converted into numbers, following this keypad pattern. Click <strong>Decode</strong>, and it reverses the process — turning the numeric code back into readable text.
                            </p>
                        </div>
                    }
                </div>
            </div >
        </>
    );
}
