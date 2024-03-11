import styles from '../styles/post.module.css';
import Tex from "@matejmazur/react-katex";

export default function Text({ title }: { title: any }) {
  if (!title) {
    return null;
  }

  return title.map((value: any) => {
    const {
      annotations: {
        bold, code, color, italic, strikethrough, underline,
      },
      text,
    } = value;

    if (value.type === "equation") {
      return <Tex key={value.id} math={value.equation.expression} />;
    }

    return (
      <span
        className={[
          bold ? styles.bold : '',
          code ? styles.code : '',
          italic ? styles.italic : '',
          strikethrough ? styles.strikethrough : '',
          underline ? styles.underline : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
        key={text?.content}
      >
        {text?.link ? <a href={text?.link?.url}>{text?.content}</a> : text?.content}
      </span>
    );
  });
}