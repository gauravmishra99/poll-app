import { Button, Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const Polls = forwardRef(({ handleViewResults, poll }, ref) => {
  const [copied, setCopied] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const hue = () => {
    setCopied(true);
    setIsCopied(true);
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <Card ref={ref} className="home__pollCards">
      <CardContent>
        <Typography>Question : {poll.poll_question}</Typography>
      </CardContent>
      <div className="home__pollbtn">
        <div>
          <CopyToClipboard text={poll.poll_link} onCopy={() => hue()}>
            <span className="copyicon">
              <FileCopyIcon />
            </span>
          </CopyToClipboard>

          {isCopied ? <span>Copied.</span> : null}
        </div>
        <Button
          variant="contained"
          size="small"
          disableElevation
          color="secondary"
          onClick={() => {
            handleViewResults({
              id: poll.id,
              createdBy: poll.poll_createdBy,
            });
          }}
        >
          View Results
        </Button>
      </div>
    </Card>
  );
});

export default Polls;
