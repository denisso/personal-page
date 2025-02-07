import React from "react";
import { TPageGeneric } from "../../lib/types";
import styled from "styled-components";
import { EntitiesLinks } from "../Elements/EntitiesLinks";
import { FallbackError } from "../Elements/FallbackError";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { FallbackLoading } from "../Elements/FallbackLoading";
import TocIcon from "@mui/icons-material/Toc";
import { ModalTOC } from "./Post/ModalTOC";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/modal";
import { PostContext } from "./Post/PostContext";
import { Button } from "@mui/material";
import { HeaderBlock } from "./_Parts/HeaderBlock";
import { HTMLElements } from "./Post/HTML/HTMLElements";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .Header {
    display: flex;
    align-items: center;
    gap: 1rem;

    .Sign {
      font-size: 2.5rem;
    }
  }

  .Body {
    background: ${({ theme }) => theme.palette.color1[300]};
    padding: 0.5rem;
    border-radius: 0.5rem;
    .PostHeader {
      scroll-snap-align: start;
      scroll-margin-top: 5rem;
    }
  }
  .TableOfTheContent {
    position: sticky;
    bottom: 2rem;
    display: flex;
    justify-content: center;
    .ButtonTOC {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.3rem 1rem;

      .Icon {
        width: 1.8rem;
        height: 1.8rem;
      }
      .Content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export const Component = ({ data }: TPageGeneric) => {
  const dispatch = useDispatch();
  const { headers, current } = React.useContext(PostContext);
  const handleOpenModal = () => {
    dispatch(openModal({ modal: "modalTOC" }));
  };
  return (
    <Container>
      <h1 className="Header">
        <span className="Sign">✍️</span> {data?.title}
      </h1>
      <HeaderBlock data={data} />

      {data?.body && (
        <div className="Body">
          <HTMLElements content={data?.body} />
        </div>
      )}

      <EntitiesLinks linked={data?.links?._all || []} />
      {headers.current.length ? (
        <div className="TableOfTheContent">
          <Button
            className="ButtonTOC"
            onClick={handleOpenModal}
            variant="outlined"
          >
            <TocIcon className="Icon" />
            <div className="Content">{headers.current[current]?.content}</div>
          </Button>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};

export const Post = (props: TPageGeneric) => {
  const router = useRouter();

  const [current, setCurrent] = React.useState(-1);
  const headers = React.useRef([]);
  if (router.isFallback) {
    return <FallbackLoading />;
  }
  if (!props.data || props.error) {
    return <FallbackError />;
  }

  return (
    <Layout title={props?.data?.title} description={props?.data?.title}>
      <PostContext.Provider value={{ headers, current, setCurrent }}>
        <Component {...props} />
        <ModalTOC />
      </PostContext.Provider>
    </Layout>
  );
};
