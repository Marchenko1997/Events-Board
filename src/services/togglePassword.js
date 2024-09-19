const togglePassword = (toggle, setInput, setIcon) => {
  if (toggle === "password") {
    setIcon(true);
    setInput("text");
  }
  if (toggle === "text") {
    setIcon(false);
    setInput("password");
  }
};

export default togglePassword;
