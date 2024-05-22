import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "@/styles/post.module.css"

const renderBookmark = ({ link, title, description, format }: { link: string, title: string, description: string, format: any }) => {
    const { bookmark_icon: icon, bookmark_cover: cover } = format
    return (
      <div className={styles.bookmark}>
        <div>
          <div style={{ display: 'flex' }}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookmarkContentsWrapper}
              href={link}
            >
              <div
                role="button"
                className={styles.bookmarkContents}
              >
                <div className={styles.bookmarkInfo}>
                  <div className={styles.bookmarkTitle}>
                    {title}
                  </div>
                  <div className={styles.bookmarkDescription}>
                    {description}
                  </div>
                  <div className={styles.bookmarkLinkWrapper}>
                    {
                      icon && (
                        <Image
                          src={icon}
                          alt="bookmark icon"
                          width={16}
                          height={16}
                          className={styles.bookmarkLinkIcon}
                        />
                      )
                    }
                    <div className={styles.bookmarkLink}>
                      {link}
                    </div>
                  </div>
                </div>
                {
                  cover && (
                    <div className={styles.bookmarkCoverWrapper1}>
                      <div className={styles.bookmarkCoverWrapper2}>
                        <div className={styles.bookmarkCoverWrapper3}>
                          <Image
                            src={cover || "https://picsum.photos/id/10/240/105"}
                            width={240}
                            height={105}
                            alt="bookmark cover"
                            className={styles.bookmarkCover}
                          />
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }

export default function LinkPreview({ url }: { url: string }) {
    const { data, status } = useUnfurlUrl(url);
  
    if (status === "error") {
      return "error";
    }

    if (status === "success" && data) {
        return renderBookmark({
            link: url,
            title: data.title,
            description: data.description || '',
            format: {
                bookmark_icon: data.favicon,
                bookmark_cover: data.imageSrc
            }
        });
    }

    return "loading...";
}

type RequestStatus = "iddle" | "loading" | "success" | "error";

type UrlData = {
  title: string;
  description: string | null;
  favicon: string | null;
  imageSrc: string | null;
};

function useUnfurlUrl(url: string) {
  const [status, setStatus] = useState<RequestStatus>("iddle");
  const [data, setData] = useState<null | UrlData>(null);

  useEffect(() => {
    setStatus("loading");

    const encoded = encodeURIComponent(url);
    fetch(`/api/unfurl/${encoded}`)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setData(data);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [url]);

  return { status, data };
}