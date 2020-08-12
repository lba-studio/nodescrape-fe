import React from "react";
import { Typography, Link } from "@material-ui/core";
import { siteTitle } from "../config/constants";
import PageSection from "../components/PageSection";

const ContributePage = () => {
  return (
    <>
      <PageSection>
        <Typography variant="h1" id="about-us">
          About Us
        </Typography>
        <Typography>
          The news is an integral part of our lives. We listen to news outlets
          in order to obtain the latest information regarding events which are
          occurring around us. In essence, watching the news would allow us to
          form a picture of reality. For some of us, it is literally our virtual
          doorway to the outside world.
        </Typography>
        <Typography>
          However, we've never considered how the news would make us feel. With
          the ongoing battle to grab your attention, media outlets often opt to
          connect emotionally with you. Sensationalist news are everywhere;
          ranging from scathing coverage of royal weddings to glowing reviews of
          your country's immigration policy. Everyone aims to appeal to you and
          other readers like you.
        </Typography>
        <Typography>
          <b>This is why we've built {siteTitle}.</b> We want to make sure that
          you have the tools to be aware of how the news could affect you
          mentally and emotionally.
        </Typography>
      </PageSection>
      <PageSection>
        <Typography variant="h2">Interested in contributing?</Typography>
        <Typography>
          We'd love anyone who's interested in this project to contribute!
        </Typography>
        <Typography>
          We've set up a{" "}
          <Link
            href="https://trello.com/b/phaKT6at/newswatch-board"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trello board
          </Link>{" "}
          to track where we're at with the project and what kind of features we
          want to build out. If this sounds like your thing, get in touch with
          us through{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://about.benjamintanone.com"
          >
            Ben's contact form
          </Link>
          .
        </Typography>
      </PageSection>
    </>
  );
};

export default ContributePage;
