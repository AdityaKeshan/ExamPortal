const List = ({ items, links }) => {
  return (
    <ul className="divide-y-2 divide-gray-400">
      {items.map((item, index) => {
        return (
          <li className="p-3 hover:bg-blue-600 hover:text-blue-200" key={index}>
            <a
              href={Array.isArray(links) && links[index]}
              className="w-full flex justify-between"
            >
              {item}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
