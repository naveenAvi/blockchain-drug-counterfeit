import { doctor } from "../../CommonPages/imagepath";


const sidebarMenu = [
  {
    id: "menu-item0",
    submenuId: "menu-items0",
    menuName: "Dashboard",
    icon: doctor,
    allowedRoles: "all",
    toggleKey: "menuitems0",
    submenuItems: [
      {
        name: "dashboard",
        path: "/manufacture-dashboard",
        allowedRoles: ["manufacturer"]
      },
      {
        name: "dashboard",
        path: "/distributor-dashboard",
        allowedRoles: "distributor"
      },
      {
        name: "dashboard",
        path: "/importer-dashboard",
        allowedRoles: ["importer"]
      },
      {
        name: "dashboard",
        path: "/admin-dashboard",
        allowedRoles: ["admin"]
      }

    ]
  },
  {
    id: "menu-item1",
    submenuId: "menu-items1",
    menuName: "Drugs",
    icon: doctor,
    allowedRoles: "admin",
    toggleKey: "Drugs",
    submenuItems: [
      {
        name: "Add Drug",
        path: "/create-drug",
        allowedRoles: ["admin"]
      },
      {
        name: "Drug List",
        path: "/view-drug",
        allowedRoles: "admin"
      },
      {
        name: "Dossages",
        path: "/create-dosage",
        allowedRoles: ["admin"]
      }
    ]
  },
  {
    id: "menu-create",
    submenuId: "menu-Creates",
    menuName: "Parties",
    icon: doctor,
    allowedRoles: "admin",
    toggleKey: "Parties",
    submenuItems: [
      {
        name: "Create Manufacturer",
        path: "/create/manufacturer",
        allowedRoles: ["admin"]
      },
      {
        name: "Create Importers",
        path: "/create/importer",
        allowedRoles: ["admin"]
      },
      {
        name: "Create Distributors",
        path: "/create/distributor",
        allowedRoles: ["admin"]
      },
      {
        name: "Create Pharmacies",
        path: "/create/pharmacy",
        allowedRoles: ["admin"]
      },
      {
        name: "Importer List",
        path: "/list-party/importer",
        allowedRoles: ["admin"]
      },
      {
        name: "Manufacturer List",
        path: "/list-party/manufacturer",
        allowedRoles: ["admin"]
      }
    ]
  },
  {
    id: "menu-order",
    submenuId: "menu-Orders",
    menuName: "Orders",
    icon: doctor,
    allowedRoles: "all",
    toggleKey: "Orders",
    submenuItems: [
      {
        name: "Add Order",
        path: "/create-order",
        allowedRoles: ["importer"]
      },
      {
        name: "Order List",
        path: "/order-list",
        allowedRoles: ["admin", "importer", "manufacturer"]
      },
      {
        name: "Transfer",
        path: "/transfer-tokens",
        allowedRoles: "all"
      },
      {
        name: "transactions ",
        path: "/transaction-list",
        allowedRoles: "all"
      },


    ]
  },

];

export default sidebarMenu;
