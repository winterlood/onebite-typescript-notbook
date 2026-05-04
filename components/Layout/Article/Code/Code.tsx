// syntax highlighter
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// codes
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";

// themes
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

import {
  CodeCaption,
  CodeWrapper,
  TopBar,
  TopBarLeftCol,
  TopbarRightCol,
  CopyButton,
} from "./Code.style";
import { useSnackbar } from "store/SnackbarStore";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("c", c);

interface Props {
  code: string;
  language?: string;
  caption?: string;
}

function copyClipboard(text: string) {
  return window.navigator.clipboard.writeText(text);
}

export default function Code({ code, language, caption }: Props) {
  const openSnackbar = useSnackbar();

  const onClickCopyCode = async () => {
    await copyClipboard(code);
    openSnackbar({
      message: "복사 되었습니다 ✅",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  return (
    <CodeWrapper>
      <TopBar>
        <TopBarLeftCol>
          <CodeCaption>{caption}</CodeCaption>
        </TopBarLeftCol>
        <TopbarRightCol>
          <CopyButton onClick={onClickCopyCode}>Copy</CopyButton>
        </TopbarRightCol>
      </TopBar>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language?.toLowerCase()}
        customStyle={{
          marginTop: "0px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        {code || ""}
      </SyntaxHighlighter>
    </CodeWrapper>
  );
}
