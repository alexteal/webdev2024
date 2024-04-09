function ChatHistory({ imageUrl, user }) {
  return (
    <div>
      {imageUrl && (
        <>
          <img src={imageUrl} alt="Chat Drawing" />
          <h2>From {user}</h2>
        </>
      )}
    </div>
  );
}

export default ChatHistory;
