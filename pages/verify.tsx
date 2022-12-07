export default ({ error }) => {
  const renderMain = () => {
    let message = "";

    if (error) {
      message = "Could not send email.";
    } else {
      message = "Please check your email!";
    }

    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen ">
        <div>{message}</div>
      </div>
    );
  };

  const render = () => {
    return renderMain();
  };

  return render();
};

export async function getServerSideProps(context) {
  const { query } = context;
  const { error } = query;

  return {
    props: {
      error: error || null,
    },
  };
}
