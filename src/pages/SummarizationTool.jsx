import React, { useState, useEffect } from "react";
import styles from "../style";
import { tick, paste, cross } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const SummarizationTool = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [Open, setOpen] = useState(false);

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // const togle = () => setOpen(!Open);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className="flex md:flex-row flex-col gap-5">
      {/* Histroy button on Medium screens */}
      <div className="w-full md:hidden flex justify-between">
        <h1 className={`${styles.heading2} text-Light`}>GrammerGenie</h1>
        <button
          className={`${styles.paraLarge} px-[20px] py-[10px] bg-Black text-Light rounded-[15px]`}
          onClick={() => setOpen(!Open)}
        >
          History
        </button>
      </div>
      {Open && (
        <div className="w-[345px] bg-Black h-[100vh] absolute right-0 top-0 pt-[24px] px-[16px]">
          <img src={cross} alt="" onClick={() => setOpen(!Open)} className="mb-5"/>
          <h3 className={`${styles.heading3} mb-5 gradient`}>History</h3>
          <div>
            {allArticles.map((item, index) => (
              <div
                key={`link-${index}`}
                onClick={() => setArticle(item)}
                className="flex gap-2 px-[10px] py-[20px] items-center overflow-hidden bg-BlackPearl mb-5 rounded-[15px]"
              >
                <div className="" onClick={() => handleCopy(item.url)}>
                  <p
                    className={`${styles.paraLarge} text-Light overflow-ellipsis`}
                  >
                    {item.url}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summariser */}
      <div>
        <h1 className={`${styles.heading1} mb-[20px] text-Light`}>
          Revolutionize Article Summarization with{" "}
          <br className="md:flex hidden" />
          <span className="gradient">OpenAI's GPT-4 Model</span>{" "}
        </h1>
        <p className={`${styles.paraLarge} mb-[20px] text-Light`}>
          Transform lengthy articles into clear and concise summaries with
          Summize, an open-source article summarizer that simplifies reading and
          saves time
        </p>
        <form
          className="flex justify-between items-center bg-Black p-[20px] rounded-[15px]"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full">
            <img src={paste} alt="link-icon" className="mr-4" />

            <input
              type="url"
              placeholder="Paste the article link"
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              onKeyDown={handleKeyDown}
              required
              className={`${styles.paraLarge} url_input text-Light w-full  overflow-hidden`}
            />
          </div>
          <button type="submit" className="p-[10px] btn-gradient">
            <img src={tick} alt="" />
          </button>
        </form>
        {/* Display Result */}
        <div className="my-[20px] bg-Black p-3 rounded-[15px]">
          {isFetching ? (
            <img src={tick} alt="loader" className="w-20 h-20 object-contain" />
          ) : error ? (
            <p className={`${styles.paraLarge} text-Light`}>
              Well, that wasn't supposed to happen...
              <br />
              <span className="">{error?.data?.error}</span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="gradient font-bold">
                  Article <span className="">Summary</span>
                </h2>
                <div className="">
                  <p className={`${styles.paraLarge} text-Light`}>
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="md:flex hidden flex-col w-[345px] h-[85vh] rounded-[15px] p-[16px] bg-Black over">
        <h3 className={`${styles.heading3} mb-5 gradient`}>History</h3>
        <div>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="flex gap-2 px-[10px] py-[20px] items-center overflow-hidden bg-BlackPearl mb-5 rounded-[15px]"
            >
              <div className="" onClick={() => handleCopy(item.url)}>
                <p
                  className={`${styles.paraLarge} text-Light overflow-ellipsis`}
                >
                  {item.url}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SummarizationTool;
