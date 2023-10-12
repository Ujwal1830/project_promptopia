import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  return (
    <section className='py-20 px-3 max-w-full flex-start flex-col min-h-screen'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Prompt</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <div className="flex-1" style={{ width: '50%', margin: '0 auto' }} >
        <form
          onSubmit={handleSubmit}
          className='mt-10 p-4 flex-grow flex flex-col gap-5 rounded-lg outline outline-offset-2 outline-2 bg-white bg-opacity-90'
        >
          <label>
            <span className='font-satoshi font-semibold text-base text-black'>
              Your AI Prompt
            </span>

            <textarea
              value={post.prompt}
              onChange={(e) => setPost({ ...post, prompt: e.target.value })}
              placeholder='Write your post here'
              required
              className='form_textarea bg-blackish'
            />
          </label>

          <label>
            <span className='font-satoshi font-semibold text-base text-black'>
              Tag{" "}
              <span className='font-normal'>
                (#product, #coding, #idea, etc.)
              </span>
            </span>
            <input
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
              type='text'
              placeholder='Enter the Tag related to above prompt'
              required
              className='form_input bg-grayish'
            />
          </label>

          <div className='flex-end mx-3 gap-4'>
            <Link href='/' className='text-blakish text-sm'>
              Cancel
            </Link>

            <button
              type='submit'
              disabled={submitting}
              className='px-5 py-1.5 text-sm bg-purple-600 rounded-full text-white font-bold'
            >
              {submitting ? `${type}ing...` : type}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default Form;