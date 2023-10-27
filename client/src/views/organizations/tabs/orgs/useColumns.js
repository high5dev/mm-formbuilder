import { ArrowUp, Copy, Eye, MoreVertical, Send, Trash, UserPlus } from "react-feather";
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

import moment from "moment";



export const useColumns = ({handleDetails},{handleDelete},{handleSendEmail},{handleActivate})=>{

const handleCopyLink = (row)=>{
    navigator.clipboard.writeText(`https://${row.path}.mymanager.com/register`);
}

function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3] + '-' + match[4];
  }
  // Return the original number if it cannot be formatted
  return phoneNumber;
}


const columns = [
    {
        name:"Organizations",
        selector:(row)=>row?.name,
        width:'14%',
        cell:(row) => <span onClick={() => handleDetails(row)}>{row.name}</span>
    },
    {
        name:"Email",
        selector:(row)=>row?.email,
        width:'15%',
        cell:(row) => <span onClick={() => handleDetails(row)}>{row.email}</span>
    },
    {
        name:"Contact",
        selector:(row)=>row?.contact,
        width:'10%',
        cell:(row) => <span onClick={() => handleDetails(row)} >{formatPhoneNumber(row.contact)}</span>
    },
    {
        name:"Address",
        selector:(row)=>row?.address,
        width:'10%',
        cell:(row) => <span onClick={() => handleDetails(row)}>{row.address}</span>
    },
    {
        name:"Path",
        selector:(row)=>row?.path,
        width:'15%',
        cell:(row)=>(<div  className="d-flex justify-content-between w-100"><span>{row.path}.mymanager.com</span>{row.isDeleted?<Copy className="text-muted" />:<Copy className="text-primary" onClick={()=>handleCopyLink(row)} style={{cursor:"pointer"}}/>}</div>)
    },
    {
        name:"Status",
        selector:(row)=>row?.isVerified,
        width:"10%",
        cell:(row) =>(row?.isDeleted?<Badge color='light-secondary'>Archived</Badge>:<Badge color='light-primary'>{row?.isVerified === true?'Verified':'Not Verified'}</Badge>)
    },
    {
        name:"Last Activity",
        selector:(row)=>row?.updatedAt,
        width:'8%',
        cell:(row)=>(<span onClick={() => handleDetails(row)}><b>{moment(row.updatedAt).format("MM/DD/yyyy")}</b></span>)
    },
    {
        name:"Users",
        selector:(row)=>row?.userCount,
        width:"6%",
        cell:(row) => <span onClick={() => handleDetails(row)}>{row?.userCount ? row?.userCount : '0'}</span>
        
    },

    {
        name:"Actions",
        selector:(row)=>row?._id,
        width:"12",
        cell:(row)=>(
            <>
            {row?.isDeleted===false && (<div className="column-action">
            <UncontrolledDropdown style={{cursor:"pointer"}}>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem
                  tag="span"
                  onClick={()=>handleSendEmail(row)}
                  className="w-100"
               
                >
                  <Send className='mx-50 text-primary' size={18} style={{cursor:"pointer"}} />
                  <span className="align-middle">Send Reminder</span>
                </DropdownItem>
        
                <DropdownItem
                  tag="span"
                  className="w-100"
                  onClick={()=>{row?.isDeleted? handleActivate(row): handleDelete(row)}}
                >
                  {row?.isDeleted ? <ArrowUp className='mx-50 text-success' size={18}  />:<Trash className='mx-50 text-danger' size={18} style={{cursor:"pointer"}} />}
                  <span className="align-middle">{row?.isDeleted?'Activate':'Archive'}</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>)}
            </>
        )
    },
]

return {
    columns
  };
}