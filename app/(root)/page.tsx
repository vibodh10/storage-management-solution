import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import Chart from "@/components/Chart";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import FormattedDateTime from "@/components/FormattedDateTime";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import ActionDropdown from "@/components/ActionDropdown";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />

        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <div key={summary.title} className="dashboard-summary-card">
              <div className="flex justify-between gap-3">
                <Image
                  src={summary.icon}
                  alt={summary.title}
                  width={68}
                  height={72}
                  className="summary-type-icon"
                />
                <h4 className="summary-type-size">
                  {convertFileSize(summary.size)}
                </h4>
              </div>
              <h5 className="summary-type-title h5 pt-8">{summary.title}</h5>

              <Separator className="my-4" />

              <p className="text-center text-light-200">
                Last Update <br />
              </p>
              <FormattedDateTime
                date={summary.latestDate}
                className="pt-2 text-center"
              />
            </div>
          ))}
        </ul>
      </section>
      <section className="dashboard-recent-files">
        <h2 className="pb-5 text-2xl font-bold">Recent files uploaded</h2>

        {files ? (
          files.documents.map((file: Models.Document) => (
            <div
              key={file.$id}
              className="flex w-full items-start justify-between py-2"
            >
              <div className="flex gap-4">
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                  className="mt-2"
                />
                <div>
                  <p className="recent-file-name pt-3">{file.name}</p>
                  <div className="recent-file-date">
                    <FormattedDateTime date={file.$createdAt} />
                  </div>
                </div>
              </div>

              <div className="ml-auto">
                <ActionDropdown file={file} />
              </div>
            </div>
          ))
        ) : (
          <div className="empty-list">No files Uploaded</div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
