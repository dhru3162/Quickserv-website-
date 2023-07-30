import create from "./create.svg";
import create_1 from "./create-1.png";
import done_1 from "./done.svg";
import done from "./done-1.png";
import pending from "./pending.png";
import pending_1 from "./pending-1.png";
import working from "./working.png";
import working_1 from "./working-1.png";
import work from "./create work.svg";
import work_1 from "./create work-1.png";

// const status = {
//     create: {
//         pending: create_1,
//         done: create
//     },

//     pending: {
//         pending: pending_1,
//         done: pending
//     },
//     working: {
//         pending: working_1,
//         done: working
//     },
//     work: {
//         pending: work_1,
//         done: work
//     },
//     done: {
//         pending: done_1,
//         done: done
//     },
// };

const status = {
    create: {
        pending: create_1,
        done: create,
    },
    pending: {
        pending: pending_1,
        done: pending,
    },
    working: {
        pending: working_1,
        done: working,
    },
    work: {
        pending: work_1,
        done: work,
    },
    done: {
        pending: done_1,
        done: done,
    },
};

export const statusData = [
    {
        statusKey: "create",
        description: "Create Request Id",
    },
    {
        statusKey: "pending",
        description: "Pending For Quotation Approval",
    },
    {
        statusKey: "working",
        description: "Engineer Allocated\nEngineer Name\nEngineer Mobile NO",
    },
    {
        statusKey: "work",
        description: "Create Work order Id",
    },
    {
        statusKey: "done",
        description: "Close, Pending For Part, Reschedule",
    },
];

export default status