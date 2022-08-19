import React, { useEffect, useState, useRef, Component } from 'react'
import GroupItemList from '../components/GroupItemList'
import GroupButton from '../components/GroupButton'
import { getGroupInfo } from '../store/group'
import { PageDiv } from '../components/Styled/PageDiv'

const SearchGroup = () => {
  const [searchText, setSearchText] = useState()
  const [searchedGroupId, setSearchedGroupId] = useState()
  const [searchedGroupInfo, setSearchedGroupInfo] = useState()
  
  useEffect(()=>{
    getGroupInfo(searchText)
    .then((res) => {
        setSearchedGroupInfo(res.data);
    });
},[])

  const onSearch = () => {
    console.log(searchText)
    setSearchText(document.getElementById('inputvalue')?.value);
    //const searchednickname = users.filter((val) => (searchText === val.nickname))
    // const result = users.filter((it) =>it.nickname === searchText)
    // return(result)
  }

  const onPressEnter = (e) => {
    if (e.key == 'Enter') {
      onSearch()
    }
  }

   /* useEffect(()=>{
      const filteredGroup = searchedGroupInfo.filter((searchedGroupInfo) => {
        if(searchText === "" || searchText === null)
          return ("검색 결과 없음")
        else
          return searchedGroupInfo.id.includes(searchText);
      })
      setSearchedGroupInfo(filteredGroup)
      },[searchText])*/

  return (
    <PageDiv>
      <div className="content">
        <div className="SearchPage">
          <div className="searchBox">
            <input
              type="text"
              id="inputvalue"
              placeholder="그룹 아이디를 입력하세요."
              onChange={(e) => { setSearchText(e.target.value) }}
              onKeyPress={onPressEnter}
            />
            <button className="searchBtn" onClick={onSearch}>
              🔍
            </button>
          </div>
        </div>
        {searchedGroupInfo.map((group)=>(
                    <GroupItemList key={group.id}
                                    data={group} />
        ))}
      </div>
    </PageDiv>
  )
}

export default SearchGroup