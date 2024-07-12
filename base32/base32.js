const characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function encode(input) {
  let binaryString = "";

  for (let i = 0; i < input.length; i++) {
    const binaryChar = input.charCodeAt(i).toString(2).padStart(8, "0");
    binaryString += binaryChar;
  }

  let encodedString = "";
  for (let i = 0; i < binaryString.length; i += 5) {
    const binarySegment = binaryString.substring(i, i + 5).padEnd(5, "0");
    const index = parseInt(binarySegment, 2);
    encodedString += characterSet[index];
  }

  while (encodedString.length % 8 !== 0) {
    encodedString += "=";
  }

  return encodedString;
}

function decode(input) {
  let binaryString = "";

  input = input.replace(/=+$/, "");

  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    const binarySegment = characterSet
      .indexOf(char)
      .toString(2)
      .padStart(5, "0");
    binaryString += binarySegment;
  }

  let decodedString = "";
  for (let i = 0; i < binaryString.length; i += 8) {
    const byte = binaryString.substring(i, i + 8);
    if (byte.length === 8) {
      const charCode = parseInt(byte, 2);
      decodedString += String.fromCharCode(charCode);
    }
  }

  return decodedString;
}

let option = "encode";

const encodeButton = document.getElementById("encode");

const decodeButton = document.getElementById("decode");

const form = document.getElementById("form");

const output = document.getElementById("output");

encodeButton.addEventListener("click", function () {
  option = "encode";
  encodeButton.classList.add("selected");
  decodeButton.classList.remove("selected");
});

decodeButton.addEventListener("click", function () {
  option = "decode";
  decodeButton.classList.add("selected");
  encodeButton.classList.remove("selected");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("input").value;

  if (option === "encode") {
    const res = encode(input);
    output.textContent = res;
  } else if (option === "decode") {
    const res = decode(input);
    output.textContent = res;
  }
});
