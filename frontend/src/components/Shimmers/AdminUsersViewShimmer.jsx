import { Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import { Typography, Input, Avatar, IconButton, Tooltip } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import { PencilIcon, MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import ContentLoader from 'react-content-loader';

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["User", "Account type", "Created", "updatedAt", ""];

const AdminUsersViewShimmer = () => (
  <Card className="h-full w-full">
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            <ContentLoader
              speed={2}
              width={120}
              height={20}
              viewBox="0 0 120 20"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="120" height="20" />
            </ContentLoader>
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            <ContentLoader
              speed={2}
              width={220}
              height={10}
              viewBox="0 0 220 10"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="220" height="10" />
            </ContentLoader>
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outlined" color="blue-gray" size="sm">
            <ContentLoader
              speed={2}
              width={80}
              height={30}
              viewBox="0 0 80 30"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="80" height="30" />
            </ContentLoader>
          </Button>
          <Button className="flex items-center gap-3" color="blue" size="sm">
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
            <ContentLoader
              speed={2}
              width={100}
              height={30}
              viewBox="0 0 100 30"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="3" ry="3" width="100" height="30" />
            </ContentLoader>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value}>
                &nbsp;&nbsp;
                <ContentLoader
                  speed={2}
                  width={60}
                  height={20}
                  viewBox="0 0 60 20"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="3" ry="3" width="60" height="20" />
                </ContentLoader>
                &nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </CardHeader>
    <CardBody className="overflow-scroll px-0">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={index}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  <ContentLoader
                    speed={2}
                    width={80}
                    height={10}
                    viewBox="0 0 80 10"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="80" height="10" />
                  </ContentLoader>
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar
                    src=""
                    alt=""
                    size="sm"
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <ContentLoader
                        speed={2}
                        width={120}
                        height={10}
                        viewBox="0 0 120 10"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect x="0" y="0" rx="3" ry="3" width="120" height="10" />
                      </ContentLoader>
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      <ContentLoader
                        speed={2}
                        width={220}
                        height={10}
                        viewBox="0 0 220 10"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                      >
                        <rect x="0" y="0" rx="3" ry="3" width="220" height="10" />
                      </ContentLoader>
                    </Typography>
                  </div>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    <ContentLoader
                      speed={2}
                      width={80}
                      height={10}
                      viewBox="0 0 80 10"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="80" height="10" />
                    </ContentLoader>
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    <ContentLoader
                      speed={2}
                      width={120}
                      height={10}
                      viewBox="0 0 120 10"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb"
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="120" height="10" />
                    </ContentLoader>
                  </Typography>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <ContentLoader
                    speed={2}
                    width={80}
                    height={10}
                    viewBox="0 0 80 10"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="80" height="10" />
                  </ContentLoader>
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <ContentLoader
                    speed={2}
                    width={120}
                    height={10}
                    viewBox="0 0 120 10"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="120" height="10" />
                  </ContentLoader>
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Tooltip content="Edit User">
                  <IconButton variant="text" color="blue-gray">
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardBody>
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        <ContentLoader
          speed={2}
          width={100}
          height={10}
          viewBox="0 0 100 10"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="3" ry="3" width="100" height="10" />
        </ContentLoader>
      </Typography>
      <div className="flex gap-2">
        <Button variant="outlined" color="blue-gray" size="sm">
          <ContentLoader
            speed={2}
            width={80}
            height={30}
            viewBox="0 0 80 30"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="80" height="30" />
          </ContentLoader>
        </Button>
        <Button variant="outlined" color="blue-gray" size="sm">
          <ContentLoader
            speed={2}
            width={80}
            height={30}
            viewBox="0 0 80 30"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="80" height="30" />
          </ContentLoader>
        </Button>
      </div>
    </CardFooter>
  </Card>
);

export default AdminUsersViewShimmer;
