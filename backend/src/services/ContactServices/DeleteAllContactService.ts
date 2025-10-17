import Contact from "../../models/Contact";

const DeleteAllContactService = async (companyId: number): Promise<void> => {
  Contact.destroy({
    where: { companyId }
  })
};

export default DeleteAllContactService;
