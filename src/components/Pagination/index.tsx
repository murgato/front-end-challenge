import { useEffect, useState } from "react";
import "../../css/pagination.css";
import { useShallowEqualSelector } from "../../hooks/useShallowEqualSelector";
import { IMoviesStates } from "../../store/ducks/movies/types";
import * as action from "../../store/ducks/movies/actions";
import { useWindowWidth } from "@react-hook/window-size";
interface PaginationProps {
  currentPage: number;
  total_results: number;
  total_pages: number;
  onChange: Function;
}

const Pagination = ({
  currentPage,
  total_results,
  total_pages,
  onChange,
}: PaginationProps) => {
  const { pagination }: IMoviesStates = useShallowEqualSelector<IMoviesStates>(
    (state: any) => state.movies
  );

  const [populatePaganation, setPopulatePaganation] = useState<any[]>([]);
  const width = useWindowWidth();

  const dividePages = () => {
    if (total_pages === 0) return;
    let pages: number = JSON.parse(JSON.stringify(total_pages >= 500 && 500));
    let sizeSection = width <= 425 ? 3 : 10;
    let sectionPages = Math.round(pages / sizeSection);
    let sectionsPage: any[] = new Array(sectionPages);
    let auxCount = 1;
    for (let i = 0; i < sectionsPage.length; i++) {
      sectionsPage[i] = [];
      for (let j = 0; j < pages; j++) {
        if (sectionsPage[i].length < sizeSection) {
          if (auxCount <= pages) sectionsPage[i].push(auxCount);
          auxCount++;
        }
      }
    }
    setPopulatePaganation(sectionsPage);
  };
  useEffect(() => {
    dividePages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total_results]);

  useEffect(() => {
    dividePages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    getSectionByPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, populatePaganation]);

  useEffect(() => {
    if (pagination.currentPage) setActiveButtom(pagination.currentPage);
  }, [pagination]);

  const getSectionByPage = () => {
    let section = 0;
    populatePaganation.forEach((populate, i) => {
      let index = populate.findIndex((page: number) => page === currentPage);
      if (index !== -1) {
        section = i;
      }
    });
    action.setPagination({ ...pagination, currentSection: section });
  };

  const changeSectionPage = (value: string) => {
    let auxPage = JSON.parse(JSON.stringify(pagination.currentSection));
    if (value === "add") {
      auxPage++;
      if (populatePaganation && populatePaganation.length > auxPage) {
        action.setPagination({ ...pagination, currentSection: auxPage });
      }
    }
    if (value === "sub") {
      if (auxPage !== 0) {
        action.setPagination({ ...pagination, currentSection: auxPage - 1 });
      }
    }
  };

  const setActiveButtom = (page: string | number) => {
    page = page.toString();
    let activeButtons = document.getElementsByClassName("active");
    if (activeButtons.length !== 0) {
      let elements = Array.from(activeButtons);
      elements.forEach((element: any) => element.classList.remove("active"));
    }
    let pageButtom = document.getElementById(page);
    if (pageButtom) pageButtom.classList.add("active");
  };

  const setLastSection = () => {
    let arrPopulated: any[] = JSON.parse(JSON.stringify(populatePaganation));
    let lastSection = arrPopulated.length - 1;
    action.setPagination({ ...pagination, currentSection: lastSection });
  };

  return (
    <div>
      <div className="container-button">
        {pagination.currentSection > 0 ? (
          <button className="button" onClick={() => changeSectionPage("sub")}>
            {"<"}
          </button>
        ) : null}
        {populatePaganation &&
          populatePaganation[pagination.currentSection]?.map((page: string) => (
            <div key={page}>
              <button
                className="button button-page"
                id={page}
                //@ts-ignore
                onClick={() => {
                  onChange(page);
                }}
              >
                {page}
              </button>
            </div>
          ))}
        {populatePaganation.length - 1 > pagination.currentSection ? (
          <>
            <button className="button" onClick={() => changeSectionPage("add")}>
              {">"}
            </button>
            <button className="button" onClick={setLastSection}>
              {"Última"}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
