import NewComment from "./new-comment";

const CommentsManager = ({ commentProps }) => {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl">دیدگاهها</h2>
      <NewComment commentProps={commentProps} />
    </section>
  );
};

export default CommentsManager;
