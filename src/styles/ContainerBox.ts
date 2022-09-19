import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
    0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const ContainerTitle = styled.div`
  font-weight: 600;
  padding: 0.5rem;
  color: #fff;
  --tw-bg-opacity: 1;
  background-color: rgb(7 89 133 / var(--tw-bg-opacity));
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type ContainerBodyProps = {
  limit?: boolean;
};

export const ContainerBody = styled.div<ContainerBodyProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: auto;
  max-height: ${(props) => (props.limit ? "35vh" : "")};
`;
