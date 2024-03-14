import { FC } from "react";
import React, { useEffect } from "react";
import { Button, Select } from "semantic-ui-react";
import input from "views/components/UI/Input/Input";
interface IProps {
  options: any;
  value: any;
  category: any;
  handleSearch: any;
  handleSelect: any;
  handleFetch: any;
  isRequesting: boolean;
  isSetting: boolean;
  setIsSetting: any;
}

const SearchFunnelCategory: FC<IProps> = (
  props: React.PropsWithChildren<IProps>
) => {
  const {
    options,
    value,
    category,
    handleSearch,
    handleSelect,
    handleFetch,
    isRequesting,
    isSetting,
    setIsSetting
  } = props;
  function resetFilter() {
    setIsSetting(true);
    handleSearch("");
    handleSelect("");
    handleFetch("", "");
    setTimeout(()=>setIsSetting(false), 300)
  }
  function handleChangeSearch(e: any) {
    handleSearch(e.target.value);
    if (e.charCode == 13) {
      if (category.length > 2 && e.target.value.length > 0) {
        setIsSetting(true);
        handleFetch(value, category);
        setTimeout(()=>setIsSetting(false), 300)
      }
    }
  }
  function handleChangeSelect(e: any) {
    handleSelect(e.value);
  }

  return (
    <div className="ui action input">
      <Select
        className="dropdown-icon-select"
        value={category}
        placeholder={"Category"}
        options={options}
        style={{ minWidth: "10em" }}
        search
        selection
        onChange={(e: any, data: any) => handleChangeSelect(data)}
      />
      <input
        type="text"
        placeholder="Type Funnel ID, Sales, Customer or Project Name"
        onKeyPress={(e: any) => handleChangeSearch(e)}
        onChange={(e: any) => handleSearch(e.target.value)}
        value={value}
      />
      <Button
        icon={category.length > 2 && value.length > 0 ? "close" : "search"}
        size="small"
        color="blue"
        onClick={
          category.length > 2 && value.length > 0
            ? resetFilter
            : () => {
              setIsSetting(true);
              handleFetch(value, category);
              setTimeout(()=>setIsSetting(false), 300)
            }
        }
      />
    </div>
  );
};

export default SearchFunnelCategory;
