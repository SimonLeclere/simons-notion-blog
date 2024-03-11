import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import Tex from "@matejmazur/react-katex";

import Text from "../text";
import styles from "../../styles/post.module.css";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function renderBlock(block: any, childLevel = 0) {
  const { type, id } = block;
  const value: any = block[type as keyof BlockObjectResponse];

  switch (type) {
    case "paragraph":

      if (value.rich_text.length === 0) {
        return <Fragment key={childLevel}>
					<br />
					{
						block.has_children ?
							block.children.map((child: any) => renderBlock(child, childLevel + 1))
						: null
					}
				</Fragment>
      }

			if (childLevel > 0) {
				return <Fragment key={childLevel}>
					<br/>
					<span style={{ paddingLeft: `${childLevel * 20}px` }}>
						<Text title={value.rich_text} />
						{
							block.has_children ?
								block.children.map((child: any) => renderBlock(child, childLevel + 1))
							: null
						}
					</span>
				</Fragment>
			}

      return (
        <p>
          <Text title={value.rich_text} />
					{
						block.has_children ? 
							block.children.map((child: any) => renderBlock(child, childLevel + 1))
						: null
					}
				</p>
      );
    case "heading_1":
      return (
        <h1>
          <Text title={value.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          <Text title={value.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          <Text title={value.rich_text} />
        </h3>
      );
    case "bulleted_list": {
      return <ul>{value.children.map((child: any) => renderBlock(child, childLevel + 1))}</ul>;
    }
    case "numbered_list": {
			const type = ['1', 'a', 'i'][childLevel % 3] as '1' | 'a' | 'i';
      return <ol type={type}>{value.children.map((child: any) => renderBlock(child, childLevel + 1))}</ol>;
    }
    case "bulleted_list_item":
    case "numbered_list_item":

      return (
        <li key={block.id}>
          <Text title={value.rich_text} />
          {/* eslint-disable-next-line no-use-before-define */}
          {!!block.children && block.children.map((block: any) => renderBlock(block, childLevel + 1))}
        </li>
      );
    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} checked={value.checked} readOnly/>{" "}
            <Text title={value.rich_text} />
          </label>
        </div>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text title={value.rich_text} />
          </summary>
          {block.children?.map((child: any) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return (
        <div className={styles.childPage}>
          <strong>{value?.title}</strong>
          {block.children.map((child: any) => renderBlock(child, childLevel + 1))}
        </div>
      );
    case "image": {
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text || "" : "";

      return (
        <figure>
          <Image src={src} alt={caption} width={0} height={0} sizes="100vw" />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case "divider":
      return <hr key={id} />;
    case "quote":
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case "code":
      return (
        <pre className={styles.pre}>
          <code className={styles.code_block} key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case "file": {
      const srcFile =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = srcFile.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className={styles.file}>
            📁{" "}
            <Link href={srcFile} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case "bookmark": {
      const href = value.url;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={styles.bookmark}
        >
          {href}
        </a>
      );
    }
    case "table": {
      return (
        <table className={styles.table}>
          <tbody>
            {block.children?.map((child: any, index: number) => {
              const RowElement =
                value.has_column_header && index === 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: any, i: number) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <RowElement key={`${cell.plain_text}-${i}`}>
                      <Text title={cell} />
                    </RowElement>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className={styles.row}>
          {block.children.map((childBlock: any) => renderBlock(childBlock, childLevel + 1))}
        </div>
      );
    }
    case "column": {
      return <div>{block.children.map((child: any) => renderBlock(child, childLevel + 1))}</div>;
    }

    case "callout": {

      return (
        <div className={styles.callout} key={id}>
          <div>
            {value.icon?.type === "emoji" && <span>{value.icon?.emoji}</span>}
            {value.icon?.type === "external" && (
              <Image
                src={value.icon?.external?.url}
                alt={value.icon?.external?.url}
                width={22}
                height={22}
                style={{ width: 22, height: 22 }}
              />
            )}
            {value.icon?.type === "file" && (
              <Image
                src={value.icon?.file?.url}
                alt={value.icon?.file?.url}
                width={22}
                height={22}
              />
            )}
          </div>
          <div className={styles.text}>
            <Text title={value.rich_text} />
          </div>
        </div>
      );
    }

		case 'equation': {
			return (
				<Tex math={value.expression} key={id} block/>
			);
		}

    default: {
			console.log(block);
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
    }
  }
}
