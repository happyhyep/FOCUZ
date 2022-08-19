import { PageDiv } from './Styled/PageDiv';
import { getBlockedFriendList } from '../store/friend';
import { useEffect, useState } from 'react';
import { friendummylist } from '../store/temp/tempFriendsData';
import RequestUserProfile from './RequestUserProfile';

const BlockedFriends = () => {
    const [BlockedList, setBlockedList] = useState([]);
    useEffect(() => {
        getBlockedFriendList()
            .then((r) => setBlockedList(r.data))
            .catch((e) => setBlockedList(friendummylist));
    }, []);
    return (
        <PageDiv>
            <h1 className="friendsheader">
                <a
                    style={{
                        color: '#ffc83d',
                        fontSize: 'min(6vw, 40px)',
                    }}
                >
                    {' '}
                    차단 친구 목록{' '}
                </a>
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {BlockedList.map((user, idx) => (
                    <RequestUserProfile
                        key={idx}
                        user={user}
                        buttontext={'차단 취소하기'}
                    />
                ))}
            </div>
        </PageDiv>
    );
};

export default BlockedFriends;
