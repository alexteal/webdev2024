function ChatHistory({ imageUrl, user }) {
  return (
    <div>
      {imageUrl && (
        <>
          <img src={imageUrl} alt="Chat Drawing" />
          <p>From {user}</p>
        </>
      )}
    </div>
  );
}

export default ChatHistory;
