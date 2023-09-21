import PanelBase from "./PanelBase";
import Content from "./Content";
import { Modal } from "../../components/Modals/EditModal/Modal";
import EditForm from "./EditForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions";

export default function Dashboard() {
  const dispatch = useDispatch();
  const owner = useSelector((state) => state.authUser.id);

  useEffect(() => {
    dispatch(getAllProducts(owner));
  }, []);

  return (
    <PanelBase>
      <Content />
      <Modal>
        <EditForm />
      </Modal>
    </PanelBase>
  );
}
