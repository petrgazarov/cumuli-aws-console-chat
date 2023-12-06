import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkCold,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useMedia } from "react-use";

import { AssistantChatMessage } from "utils/types";

import { MarkdownCode, MarkdownContent, MarkdownLink } from "./styled";

const AssistantMessage = ({
  chatMessage,
}: {
  chatMessage: AssistantChatMessage;
}) => {
  const isDarkMode = useMedia("(prefers-color-scheme: dark)");

  const components = {
    a(props: any) {
      const { node: _node, ...rest } = props;

      return (
        <MarkdownLink {...rest} target="_blank" rel="noopener noreferrer" />
      );
    },
    code(props: any) {
      const { children, className, node: _node, ...rest } = props;
      const match = /language-(\w+)/.exec(className || "");

      return match ? (
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={isDarkMode ? vscDarkPlus : coldarkCold}
          customStyle={{ fontSize: isDarkMode ? "15px" : "13.5px" }}
        />
      ) : (
        <MarkdownCode
          {...rest}
          className={className}
          style={{ fontSize: "13px" }}
        >
          {children}
        </MarkdownCode>
      );
    },
  };

  return (
    <MarkdownContent>
      <ReactMarkdown components={components}>
        {chatMessage.content}
      </ReactMarkdown>
    </MarkdownContent>
  );
};

export default AssistantMessage;
