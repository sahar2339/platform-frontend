/// <reference types="vite-plugin-svgr/client" />
import Typography from "@/components/typography/Typography";
import Container from "@/components/container/Container";
import React, { useState } from "react";
import Pagination from "@components/pagination/Pagination";
import DisplayBar from "@components/display/displayBar/DisplayBar";
import AddMemberModal from "@components/members/addProjectModal/AddMemberModal";
import Spinner from "@components/spinner/Spinner";
import MemberRow from "@components/members/member/row/MemberRow";
import NoProjects from "@components/projects/noProjects/NoProjects";
import { useMembers} from "@hooks/members/useMembers";
import { PROJECTS_PAGE_SIZE } from "@common/consts";
import NoSearchResults from "@components/projects/noSearchResults/NoSearchResults";

const ProjectsOverview: React.FC = React.memo(() => {
  const [showModal, setShowModal] = useState(false);

  const {
    currentPage,
    setCurrentPage,
    totalCount,
    currentAmount,
    isPlaceholderData,
    members,
    isSuccess,
    isLoading,
    setSearch,
    search, 
  } = useMembers();



  const hasProjects = isSuccess && currentAmount > 0;
  const noSearchResultsFound = !hasProjects && search !== "";

  return (
    <Container>
      <div className="mt-10 text-mono/basic-1 mx-10 w-full flex flex-col">
        <div className="max-h-1/4">
        <Typography variant="headline-xs">Test</Typography>
          <Typography variant="headline-xl">Members</Typography>
          <DisplayBar
            success={isSuccess}
            isDisplayGrid={false}
            setShowModal={setShowModal}
            setSearch={setSearch}
            button="Add new member"
            searchPlaceholder="Search by username"
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : hasProjects ? (
          <>
            <div className="flex custom-scroll overflow-y-scroll grow-0 max-h-[65%] h-[65%] min-h-[65%]">
             <table className="w-full h-fit	text-left	">
                <thead>
                  <tr>
                    <th className="w-full ">Name</th>
                    <th className="w-6">Last active</th>
                    <th  className="w-6">Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <MemberRow
                      username={member.username}
                      lastActive={member.lastActive}
                      role={member.role}
                    />
                  ))}
                </tbody>
             </table>
            </div>
            <div className="flex items-center justify-between h-[10%]">
              <Typography variant="body-sm" className="text-mono/basic-4">
                Shows {currentAmount} of {totalCount}
              </Typography>
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={PROJECTS_PAGE_SIZE}
                onPageChange={setCurrentPage}
                isPlaceholderData={isPlaceholderData}
              />
            </div>
          </>
        ) : noSearchResultsFound ? (
          <NoSearchResults
            search={search}
            className="max-h-[65%] h-[65%] min-h-[65%]"
          />
        ) : (
          <NoProjects
            setShowModal={setShowModal}
            className="max-h-[65%] h-[65%] min-h-[65%]"
          />
        )}
      </div>
      {showModal && <AddMemberModal setShowModal={setShowModal} />}
    </Container>
  );
});

export default ProjectsOverview;
