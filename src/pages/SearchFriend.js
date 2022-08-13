import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/auth';
import FriendsProfileList from '../components/FriendsProfileList';
import { fetchAllUserList } from '../store/user';
import { sendFriendRequest } from '../store/friend';
import Pagination from '../components/Common/pagination';

const SearchFriend = () => {
    // App.js에서 주입(Provide)한 context정보 받아오기
    const auth = useContext(AuthContext);
    console.log('context auth', auth);

    const [allUserList, setAllUserList] = useState([]);
    const [searchText, setSearchText] = useState();
    const [allRequestList, setAllRequestList] = useState();
    /* const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); */

    useEffect(async () => {
        // 모든 유저 정보 API Call
        await fetchAllUserList().then((res) => {
            console.log('all user list', res.data);
            setAllUserList(res.data);
        });
    }, []);

    const onSearch = (e) => {
        setSearchText(document.getElementById('inputvalue')?.value);
        console.log(searchText);
    };

    const onPressEnter = (e) => {
        if (e.key == 'Enter') {
            onSearch();
        }
    };

    // 초기값 allUserList로 설정
    const filteredFriend = allUserList.filter((users) => {
        if (searchText === '' || searchText === null) {
            return false;
        } else {
            return users.nickname.includes(searchText);
        }
    });
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="content">
                <div className="SearchPage">
                    <div className="searchBox">
                        {/* <form onSubmit={(e)=> {setSearchText(e.target.value)}}> */}
                        <input
                            id="inputvalue"
                            type="text"
                            placeholder="친구의 닉네임을 입력하세요."
                            onKeyPress={onPressEnter}
                        />
                        <button className="searchBtn" onClick={onSearch}>
                            🔍
                        </button>
                        {/* </form> */}
                    </div>
                </div>
                {filteredFriend && <FriendsProfileList data={filteredFriend} />}
                {/* <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={filteredFriend.length}
                    paginate={paginate}
                /> */}
            </div>
        </>
    );
};

export default SearchFriend;
