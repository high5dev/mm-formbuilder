// ** React Imports
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Custom Components
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  useReactFlow,
  Background,
  Position
} from 'react-flow-renderer';
import Swal from 'sweetalert2';

// ** Styles
import '@styles/react/apps/app-kanban.scss';
import 'reactflow/dist/style.css';
import '@styles/react/libs/editor/editor.scss';
import CustomNode from '@src/views/marketing/automation/chartflow/components/CustomNode';
import EditContactSideBar from '@src/views/marketing/automation/chartflow/components/EditContactSideBar';
import AddNewActionSideBar from '@src/views/marketing/automation/chartflow/components/AddNewActionSideBar';
import ShowDetailModal from '@src/views/marketing/automation/chartflow/components/ShowDetailModal';
import AddText from '@src/views/marketing/automation/chartflow/components/addNewSideBars/AddText';
import AddNotification from '@src/views/marketing/automation/chartflow/components/addNewSideBars/AddNotification';
import AddEmail from '@src/views/marketing/automation/chartflow/components/addNewSideBars/AddEmail';
import AddAutomation from '@src/views/marketing/automation/chartflow/components/addNewSideBars/AddAutomation';
import AddTask from '@src/views/marketing/automation/chartflow/components/addNewSideBars/AddTask';
// import {
//   initEditAction,
//   saveFormAutomationAction,
//   setOffEditableContactAction,
//   setOffShowAddNewActionSideBarAction
// } from '../../../../../marketing/automation/store/actions';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { ArrowLeft } from 'react-feather';
import { updateFormAction } from '../../../../store/action';
import { getUserData } from '../../../../../../utility/Utils';

const WIDTH = 100;
const HEIGHT = 170;

const Layout = ({
  isMobileView,
  isTabletView,
  setShowAutomation,
  form,
  title,
  automationUpdated
}) => {
  const dispatch = useDispatch();

  // Variables for automation
  const userData = getUserData();
  const userName = userData?.fullName,
    userEmail = userData?.email,
    userPhone = userData?.phone;

  const selectedAutomation = useSelector((state) => state.automation.selectedAutomation);
  const actionsData = selectedAutomation?.actions;
  const {
    isEditContact,
    showAddNewSideBar,
    showDetailId,
    editActionId,
    isEditModal,
    editActionType
  } = useSelector((state) => state.automation);

  // States for flowchart
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [actionSum, setActionSum] = useState(0);

  // States for popup Modals
  const [isShowEditModal, setIsShowEditModal] = useState(isEditModal);

  useEffect(() => {
    if (actionsData?.length > 0) {
      const treeObj = {};

      for (let item of actionsData) {
        treeObj[item.id] = { ...item, children: [], leafCount: 0, posX: 0, posY: HEIGHT };
      }

      for (let item of actionsData) {
        if (item.parentId == '0') continue;
        treeObj[item.parentId].children.push(item.id);
      }

      function calcLeaf(id) {
        if (treeObj[id].isLast) {
          treeObj[id].leafCount = 1;
          return 1;
        }

        let result = 0;
        for (let item of treeObj[id].children) {
          result += calcLeaf(item);
        }
        treeObj[id].leafCount = result;
        return result;
      }

      calcLeaf(actionsData[0].id);

      function calcPos(id) {
        if (treeObj[id].isLast) {
          return;
        }
        if (treeObj[id].children.length === 1) {
          const childId = treeObj[id].children[0];
          treeObj[childId].posX = 0;
          treeObj[childId].posY = HEIGHT;
          calcPos(childId);
          return;
        }
        const leftId = treeObj[id].children[0];
        const rightId = treeObj[id].children[1];

        calcPos(leftId);
        calcPos(rightId);

        treeObj[leftId].posX =
          (-(treeObj[leftId].leafCount + treeObj[rightId].leafCount) * WIDTH) / 2;
        treeObj[leftId].posY = HEIGHT;

        treeObj[rightId].posX =
          ((treeObj[leftId].leafCount + treeObj[rightId].leafCount) * WIDTH) / 2;
        treeObj[rightId].posY = HEIGHT;
      }

      calcPos(actionsData[0].id);

      const result = [
        {
          id: '0',
          data: {
            id: '0',
            actionType: 'editContact',
            isLast: false,
            label: 'EditContact',
            content: 'EditContact'
          },
          type: 'circle',
          targetPosition: Position.Top,
          position: { x: 0, y: -500 }
        }
      ];
      for (let key in treeObj) {
        result.push({
          id: treeObj[key].id,
          data: treeObj[key],
          position: { x: treeObj[key].posX, y: treeObj[key].posY },
          parentNode: treeObj[key].parentId,
          type: 'circle'
        });
      }

      setNodes(result);
    } else {
      setNodes([
        {
          id: '0',
          data: {
            id: '0',
            actionType: 'editContact',
            isLast: true,
            label: 'EditContact',
            content: 'EditContact'
          },
          type: 'circle',
          position: { x: 0, y: -500 }
        }
      ]);
    }

    // Action Count
    let actionCount = 0;
    if (actionsData?.length > 0) {
      let edgesData = [];
      actionsData.map((item, index) => {
        const edgeItem = {
          id: item.id + '-' + item.parentId,
          source: item.parentId,
          target: item.id
        };
        edgesData.push(edgeItem);
        if (item.actionType != 'condition') actionCount++;
      });
      setEdges(edgesData);
      setActionSum(actionCount);
    } else {
      setActionSum(0);
    }
  }, [actionsData]);
  useEffect(() => {
    setIsShowEditModal(isEditModal);
  }, [isEditModal]);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const { zoomIn, zoomOut } = useReactFlow();

  const toggleContactSideBar = () => {
    //dispatch(setOffEditableContactAction());
  };
  const toggleNewActionSideBar = () => {
    //dispatch(setOffShowAddNewActionSideBarAction());
  };
  const toggleEditSidebar = () => {
    setIsShowEditModal(false);
    //dispatch(initEditAction());
  };

  const handleBack = () => {
    setShowAutomation(false);
  };
  const handleSaveAutomation = () => {
    Swal.fire({
      title: 'Save Automation',
      text: `Do you want to save this automation for step 1?`,
      icon: 'question',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#d33',

      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#3085d6',

      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        const _selectedAutomation = {
          ...selectedAutomation,
          automationName: title,
          formId: form?._id,
          userName,
          userEmail,
          userPhone
        };
        // dispatch(saveFormAutomationAction(_selectedAutomation)).then((res) => {
        //   console.log(res);
        //   const savedData = res?.data?.data;
        //   const automationId = savedData?._id;
        //   const tmpForm = {
        //     ...form,
        //     automationId
        //     // formData: form.formData?.map((step) =>
        //     //   step.id == selectedStep.id
        //     //     ? {
        //     //         ...step,
        //     //         automationId
        //     //       }
        //     //     : step
        //     // )
        //   };
        //   dispatch(updateFormAction(form?._id, tmpForm));
        //   if ((res.status = 200)) {
        //     Swal.fire({
        //       icon: 'success',
        //       title: 'Saved!',
        //       text: 'Your automation saved successfully.',
        //       customClass: {
        //         confirmButton: 'btn btn-success'
        //       }
        //     });
        //   } else {
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Something went wrong!',
        //       text: 'Save automation failed.',
        //       customClass: {
        //         confirmButton: 'btn btn-success'
        //       }
        //     });
        //   }
        // });
      }
    });
  };

  const nodeTypes = { circle: CustomNode };
  return (
    <>
      <div className="app-user-list bg-white" style={{ width: '100%' }}>
        <div
          className="d-flex align-items-center justify-content-between "
          style={{ borderBottom: 'solid 1px #eee' }}
        >
          <div className="d-flex align-items-center" style={{ paddingBlock: '8px' }}>
            <Button id="go-back" className="btn btn-icon" color="flat" onClick={handleBack}>
              <ArrowLeft size={16} />
            </Button>
            <UncontrolledTooltip target={'go-back'} placement="bottom">
              Go back
            </UncontrolledTooltip>
            <h5 className="mb-0" style={{ height: '32px', paddingTop: '7px' }}>
              {title}
            </h5>
          </div>
          <Button color="primary me-1" onClick={handleSaveAutomation} disabled={!automationUpdated}>
            Save
          </Button>
        </div>
        <div className="flow-chart">
          <div
            className="automation-tour-7"
            style={{
              background: 'white',
              position: 'absolute',
              top: isMobileView ? '370px' : isTabletView ? '250px' : '76px',
              left: '283px',
              textAlign: 'center',
              zIndex: '100',
              width: '80px',
              height: '120px',
              textAlign: 'center'
            }}
          >
            <label className="text-uppercase">Actions</label>
            <div
              style={{
                border: '1px solid blue',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                margin: 'auto'
              }}
            >
              <p style={{ fontSize: '24px', padding: '19px 0px' }}>{actionSum}</p>
            </div>

            <div className="d-flex justify-content-around gaps border-1 mt-1 w-70">
              <div
                style={{
                  border: '1px solid black',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => zoomIn({ duration: 800 })}
              >
                <p style={{ fontSize: '18px', textAlign: 'center' }} className="font-weight-bold">
                  +
                </p>
              </div>
              <div
                style={{
                  border: '1px solid black',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  marginLeft: '3px',
                  cursor: 'pointer'
                }}
                onClick={() => zoomOut({ duration: 800 })}
              >
                <p style={{ fontSize: '18px', textAlign: 'center' }} className="font-weight-bold">
                  -
                </p>
              </div>
            </div>
          </div>
          <div
            className="automation-tour-8"
            style={{ width: '100vm', height: '100vh', margin: 'auto', background: 'white' }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onConnect={onConnect}
              fitView
              snapToGrid={true}
              nodeTypes={nodeTypes}
              minZoom={0.5}
              maxZoom={2}
            >
              <Background />
            </ReactFlow>
          </div>
        </div>
      </div>
      {isEditContact && (
        <EditContactSideBar
          open={isEditContact}
          toggleSidebar={toggleContactSideBar}
          isForm={true}
        />
      )}
      <AddNewActionSideBar open={showAddNewSideBar} toggleSidebar={toggleNewActionSideBar} />
      {showDetailId != '' && <ShowDetailModal actionId={showDetailId} />}

      {isShowEditModal && editActionType == 'text' && (
        <AddText open={isShowEditModal} toggleSidebar={toggleEditSidebar} />
      )}
      {isShowEditModal && editActionType == 'notification' && (
        <AddNotification open={isShowEditModal} toggleSidebar={toggleEditSidebar} />
      )}
      {isShowEditModal && editActionType == 'email' && (
        <AddEmail open={isShowEditModal} toggleSidebar={toggleEditSidebar} />
      )}
      {isShowEditModal && editActionType == 'automation' && (
        <AddAutomation open={isShowEditModal} toggleSidebar={toggleEditSidebar} />
      )}
      {isShowEditModal && editActionType == 'task' && (
        <AddTask open={isShowEditModal} toggleSidebar={toggleEditSidebar} />
      )}
    </>
  );
};

const WorkFlow = ({
  isMobileView,
  isTabletView,
  selectedStep,
  form,
  title,
  setShowAutomation,
  automationUpdated
}) => {
  return (
    <ReactFlowProvider>
      <Layout
        // goBackToTable={props.goBackToTable}
        isMobileView={isMobileView}
        isTabletView={isTabletView}
        selectedStep={selectedStep}
        form={form}
        title={title}
        setShowAutomation={setShowAutomation}
        automationUpdated={automationUpdated}
      />
    </ReactFlowProvider>
  );
};

export default WorkFlow;
