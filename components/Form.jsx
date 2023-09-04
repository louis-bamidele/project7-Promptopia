import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const handleTagChange = (e) => {
    let value = e.target.value;
    let regex = /^[a-zA-Z]*$/;
    setPost({ ...post, tag: e.target.value });
    let boolean = regex.test(value);
    if (boolean) {
      e.target.classList.remove("form_input_isvalid");
    } else {
      e.target.classList.add("form_input_isvalid");
    }
  };
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompt with the world, and let your imagination
        run wild with any AI-Powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here....'
            rows='6'
            cols='30'
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag{" "}
            <span className='font-normal'>
              (#idea #hobbies #imagination #workout #webdevelopment)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => handleTagChange(e)}
            placeholder='#TAG'
            pattern='^[a-zA-Z]*$'
            required
            className='form_input'
          />
          <span className='form_validate'>
            Only letters are allowed. space, numbers and special characters
            ain't allowed
          </span>
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link className='text-gray-500 text-sm' href='#'>
            Cancel
          </Link>
          <button
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            type='submit'
            disabled={submitting}>
            {submitting ? `${type}....` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
