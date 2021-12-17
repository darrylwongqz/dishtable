import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PaginationBar = ({ pageCount }) => {
  const router = useRouter();
  const [nextPageResults, setNextPageResults] = useState(true);

  // console.log(router.query);
  // console.log("pageCount", pageCount);

  const { city, date, p, party_size, search_flag, search_term, time } =
    router.query;

  const convertedPageNum = Number(p);

  const nextPage = convertedPageNum + 1;

  const previousPage = convertedPageNum - 1;

  useEffect(() => {
    if (pageCount < 2) {
      setNextPageResults(false);
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-3 mb-5 bg-white sm:px-6">
      <div className="flex justify-between flex-1">
        {convertedPageNum > 1 ? (
          <Link
            href={`/search?city=${city}&date=${date}&time=${time}&party_size=${party_size}&search_term=${search_term}&search_flag=${search_flag}&p=${previousPage}`}
          >
            <a className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </a>
          </Link>
        ) : (
          <p className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-md opacity-75 hover:bg-gray-50 hover:cursor-not-allowed">
            Previous
          </p>
        )}
        {nextPageResults ? (
          <Link
            href={`/search?city=${city}&date=${date}&time=${time}&party_size=${party_size}&search_term=${search_term}&search_flag=${search_flag}&p=${nextPage}`}
          >
            <a className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </a>
          </Link>
        ) : (
          <p className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-md opacity-75 hover:bg-gray-50 hover:cursor-not-allowed">
            Next
          </p>
        )}
      </div>
    </div>
  );
};

export default PaginationBar;
