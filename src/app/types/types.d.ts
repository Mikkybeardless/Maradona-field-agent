// product types
declare type ProductType = "LAND" | "CAR" | "HOUSE";
declare type ProductStatus = "draft" | "published";
declare type ProductBodyType = "SUV" | "Sedan" | "Coupe" | "Truck" | "Bus";
declare type ProductFurnishedStatus = "furnished" | "unfurnished";
declare type ProductAccessibility = "main-road" | "inner-road";
declare type ProductFencing = "fenced" | "not-fenced";
declare type ProductTopography = "dry-land" | "water-logged" | "swampy";
declare type ProductLandType = "residential" | "commercial" | "agricultural";
declare type ProductDuration = "days" | "weeks" | "months";
declare type ProductAuctionType = "auctioned" | "non-auctioned";
declare type ProductCondition = "new" | "old";
declare type ProductGearType = "manual" | "automatic";
declare type WeightUnit = "kg" | "g";
declare type Media = File[];
declare type HouseCondition = "newly-built" | "old" | "needs-renovation";
declare type Category_id = "1" | "2" | "3";

declare interface Product {
  name: string;
  type: ProductType;
  description: string;
  category_id: Category_id;
  price: number;
  address: string;
  city: string;
  sale_price: number;
  continue_selling: boolean;
  state: string;
  weight_unit: WeightUnit;
  sku: string;
  media: string[];
  documents: string[];
  status: ProductStatus;
  tags: number[];
  inventory: number;
  // weight: number;
  // duration: ProductDuration | null;
  auction_duration: number | null;
  condition: ProductCondition | null;
  auction_type: ProductAuctionType;
}

declare interface Auction {
  name: string;
  type: string;
  description: string;
  category_id: Category_id;
  sku: string;
  price: string;
  // sale_price: string;
  inventory: number;
  media: Media;
  documents: Media;
  status: ProductStatus;
  starting_bid: string;
  reserve_price: string;
  start_time: string;
  end_time: string;
  tags: string[];
  incremental_bid_amount: string;
  minimum_bid_increment: string;
  auto_extend: string;
}

declare interface ApiAuction extends Auction, ApiRes {
  winning_bid_id: string;
  seller_id: string;
  approved_by: string;
  approved_at: string;
  time_left: string;
}

declare interface House extends Product {
  house_type: string;
  house_beds: number;
  house_furnished: ProductFurnishedStatus;
  house_condition: HouseCondition;
  house_size: number;
  accessibility: ProductAccessibility;
  topography: ProductTopography;
  fencing: ProductFencing;
}

declare interface Land extends Product {
  land_type: ProductLandType;
  land_size: number;
  accessibility: ProductAccessibility;
  topography: ProductTopography;
  fencing: ProductFencing;
}
declare interface Car extends Product {
  body_type: ProductBodyType;
  engine_type: string;
  transmission: string;
  mileage: string;
  gear_type: ProductGearType | null;
}
declare type ProductDetails = House | Land | Car;
declare interface ApiProduct extends Product {
  id: number;
  created_at: string;
  updated_at: string;
  seller: Seller;
  belongs_to_admin: boolean;
}

// users

interface User {
  name: string;
  email: string;
  email_verified_at: string | null;
  type: string;
}

interface ApiRes {
  id: number;
  created_at: string;
  updated_at: string;
}
declare interface ApiUser extends User, ApiRes {}
declare interface Agent extends User {
  agent_profile: {
    id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    location: string;
    phone: string;
    staff_id: string;
    availability: string;
    bank_name: string;
    bank_account_number: string;
  };
}
declare interface ApiAgent extends Agent, ApiRes {}
declare interface Seller extends User {
  seller_profile: {
    id: number;
    user_id: string;
    shop_name: string | null;
    email: string | null;
    phone: string | null;
    profile_pic: string | null;
    is_approved: boolean;
    created_at: string;
    updated_at: string;
  };
}
declare interface Inspection {
  id: number;
  product_type: string;
  product_id: string;
  seller_id: string;
  agent_id: string;
  scheduled_at: string;
  status: string;
  notes: string;
  assigned_at: string;
  completed_at: string;
  auction_product: null;
  product: Product;
  agent: Agent;
  seller: Seller;
}
declare interface ApiInspection extends Inspection, ApiRes {}

// statistics
declare interface Period {
  start: string;
  end: string;
  description: string;
}

declare interface BidStats {
  total_assigned: number;
  sold_count: number;
  pending_count: number;
  rejected_count: number;
  total_revenue: string;
  conversion_rate: number;
  period: Period;
}

declare interface EnquiryStats {
  closed_count: number;
  conversion_rate: number;
  pending_count: number;
  period: Period;
  sold_count: number;
  total_assigned: number;
  total_revenue: string;
}

declare interface InspectionStats {
  total_inspections: number;
  completed_inspections: number;
  pending_inspections: number;
  purchase_inspections: {
    total: number;
    completed: number;
    pending: number;
  };
  regular_inspections: {
    total: number;
    completed: number;
    pending: number;
  };
  completion_rate: number;
  period: Period;
}

declare interface Conversion {
  total_assignments: number;
  total_sold: number;
  conversion_rate: number;
}
declare interface ConversionStats {
  overall_conversion: Conversion;
  purchase_enquiries_conversion: Conversion;
  auction_bids_conversion: Conversion;
  period: Period;
}

declare interface monthStats {
  month: string;
  month_key: string;
  total_assignments: number;
  total_sold: number;
  conversion_rate: number;
  enquiries_assigned: number;
  enquiries_sold: number;
  bids_assigned: number;
  bids_sold: number;
}

declare interface MonthlyPerformance {
  data: monthStats[];
  period: Period;
}

declare interface Stats {
  inspections: InspectionStats;
  conversions: ConversionStats;
  performance: MonthlyPerformance;
  bids: BidStats;
  enquiries: EnquiryStats;
}

declare interface dataObj {
  name: string;
  value: string | number;
  color: string;
}

interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  bank_name: string;
  bank_account_number: string;
}

declare type UpdateProfileDto = Partial<Profile>;

declare interface ApiProfile extends Profile, ApiRes {
  user_id: string;
  staff_id: string;
}

declare interface AgentProfile {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    type: string;
    created_at: string;
    updated_at: string;
    agent_profile: {
      id: number;
      user_id: string;
      created_at: string;
      updated_at: string;
      location: string;
      phone: string;
      staff_id: string;
      availability: string;
      bank_name: string;
      bank_account_number: string;
    };
  };
  profile: {
    id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    location: string;
    phone: string;
    staff_id: string;
    availability: string;
    bank_name: string;
    bank_account_number: string;
  };
}

declare interface Enquiry {
  id: number;
  purchase_enquiry_id: string;
  agent_id: string;
  scheduled_at: string;
  completed_at: string;
  notes: string;
  status: string;
  created_at: string;
  updated_at: string;
  purchase_enquiry: {
    id: number;
    product_id: string;
    buyer_id: string;
    message: string;
    status: string;
    agent_id: string;
    qty_sold: number | null;
    sold_price: number | null;
    sold_at: string | null;
    created_at: string;
    updated_at: string;
  };
}
