
import ConfigsCache, { configStorage } from "../configs/siteConfigs";
import AbstractProvider from "./provider";
import { type } from '../../components/Icons';

export interface ProductInfoList {
    title: string;
    items?: string[];
}

export type ProductType = 'course' | 'book' | 'appointment' | 'yin-yang' | 'meridians' | 'evaluations' | 'therapeutic-techniques';

export interface Product {
  id?: string;
  homePosition?: number|string;
  name?: string;
  type?: ProductType;
  category?: string;
  headline?: string;
  description?: string;
  price?: number;
  purchaseUrl?: string;
  paymentInfo: string;
  image?: string;
  youtube?: string;
  infos?: ProductInfoList[];
  reviews?: string[];
  tags?: string[];
  attendants?: string[];
}

export default class ProductsProvider extends AbstractProvider<Product> {
  private static MAX_HOME_PRODUCTS: number | undefined;
  private fullName: string;
  
  protected requiredFields: (keyof Product)[] = ["name", "description"];
  public collectionName = "products";
  public keys: (keyof Product)[] = [
    "homePosition", "name", "headline", "description", "category", "image", "price", "purchaseUrl", "paymentInfo",
    "youtube", "infos", "reviews", "tags", "attendants"
  ];

  constructor(private type?: ProductType) {
    super();
    this.fullName = this.collectionName + this.type;
  }

  public getType(): ProductType|undefined {
    return this.type;
  }
      
  private addAttendantIfNeeded(item: Partial<Product>) {
    const attendent = ConfigsCache.getCachedAttendantId();
    item.attendants = item.attendants ?? [];
    if (attendent && item.attendants.length === 0) {
      item.attendants.push(attendent);
    }
  }

  protected validateData(item: Partial<Product>): void {
    this.addAttendantIfNeeded(item);
    if(typeof item.homePosition === "string")
      item.homePosition = Number.parseFloat(item.homePosition.replace(",", "."));
    super.validateData(item);
  }

  protected filterData(item: Partial<Product>) {
    item.type = this.type
    return super.filterData(item);
  }

  private getMergedFilter(filter?: Partial<Product>): Partial<Product> {
    const attendent = ConfigsCache.getCachedAttendantId();
    const attendentFilter = attendent ? { attendants: [attendent] } : {};
    const typeFilter = this.type ? { type: this.type } : {};
    return { ...typeFilter, ...attendentFilter, ...filter };
  }

  private saveCountCache(count: number) {
    if(count === 0)
      configStorage.removeItem(this.fullName);
    else 
      configStorage.setItem(this.fullName, "true");
    return count;
  }

  public async countAll(filter?: Partial<Product> | undefined): Promise<number> {
    const mergedFilter = this.getMergedFilter(filter);
    return this.saveCountCache(
      await super.countAll(mergedFilter)
    );
  }

  public async listAll(filter?: Partial<Product>, orderBy?: keyof Product, limit?: number): Promise<Product[]> {
    const mergedFilter = this.getMergedFilter(filter);
    const all = await super.listAll(mergedFilter, orderBy, limit);
    this.saveCountCache(all.length);
    return all;
  }

  private lastHomeResult: Product[] | null = null;

  public async listHomeProducts(): Promise<Product[]> {
    if(this.lastHomeResult)
      return this.lastHomeResult;

    const filters = this.getMergedFilter();
    const result = super.listAll(filters, 'homePosition', ProductsProvider.MAX_HOME_PRODUCTS);
    this.lastHomeResult = await result;
    return result;
  }

  public async getById(id: string): Promise<Product | null> {
    const cache = this.lastResult?.find(item => item.id === id);

    return cache ? cache : await super.getById(id)
  }

  public hasItems(): boolean {
    return configStorage.getItem(this.fullName) === "true";
  }
}