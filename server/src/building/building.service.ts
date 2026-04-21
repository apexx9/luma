import { Inject, Injectable } from '@nestjs/common';
import { buildings } from '../db/schema';
import { eq, ilike, and, or } from 'drizzle-orm';

@Injectable()
export class BuildingsService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  async createBuilding(buildingData: any, userId: number) {
    try {
      const [newBuilding] = await this.db
        .insert(buildings)
        .values({ ...buildingData, createdAt: new Date(), updatedAt: new Date() })
        .returning();
      
      return newBuilding;
    } catch (error) {
      throw new Error(`Failed to create building: ${error.message}`);
    }
  }

  async getAllBuildings() {
    try {
      const allBuildings = await this.db.select({
        id: buildings.id,
        name: buildings.name,
        address: buildings.address,
        city: buildings.city,
        state: buildings.state,
        zipCode: buildings.zipCode,
        country: buildings.country,
        type: buildings.type,
        totalUnits: buildings.totalUnits,
        yearBuilt: buildings.yearBuilt,
        squareFootage: buildings.squareFootage,
        numberOfFloors: buildings.numberOfFloors,
        purchasePrice: buildings.purchasePrice,
        monthlyRent: buildings.monthlyRent,
        propertyTax: buildings.propertyTax,
        insurance: buildings.insurance,
        status: buildings.status,
        managerId: buildings.managerId,
        latitude: buildings.latitude,
        longitude: buildings.longitude,
        imageUrl: buildings.imageUrl,
        description: buildings.description,
        createdAt: buildings.createdAt,
        updatedAt: buildings.updatedAt,
      }).from(buildings);
      
      return allBuildings;
    } catch (error) {
      throw new Error(`Failed to fetch buildings: ${error.message}`);
    }
  }

  async getBuildingById(id: number) {
    try {
      const [building] = await this.db
        .select()
        .from(buildings)
        .where(eq(buildings.id, id));
      
      return building || null;
    } catch (error) {
      throw new Error(`Failed to fetch building: ${error.message}`);
    }
  }

  async updateBuilding(id: number, updateData: any, userId: number) {
    try {
      const [updatedBuilding] = await this.db
        .update(buildings)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(buildings.id, id))
        .returning();
      
      return updatedBuilding;
    } catch (error) {
      throw new Error(`Failed to update building: ${error.message}`);
    }
  }

  async deleteBuilding(id: number, userId: number) {
    try {
      await this.db
        .delete(buildings)
        .where(eq(buildings.id, id));
      
      return { message: 'Building deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete building: ${error.message}`);
    }
  }

  // Search and filter methods
  async searchBuildings(query: string) {
    try {
      const results = await this.db
        .select()
        .from(buildings)
        .where(
          or(
            ilike(buildings.name, `%${query}%`),
            ilike(buildings.address, `%${query}%`),
            ilike(buildings.city, `%${query}%`),
            ilike(buildings.state, `%${query}%`)
          )
        );
      
      return results;
    } catch (error) {
      throw new Error(`Failed to search buildings: ${error.message}`);
    }
  }

  async getBuildingsByCity(city: string) {
    try {
      const results = await this.db
        .select()
        .from(buildings)
        .where(ilike(buildings.city, `%${city}%`));
      
      return results;
    } catch (error) {
      throw new Error(`Failed to fetch buildings by city: ${error.message}`);
    }
  }

  async getBuildingsByType(type: string) {
    try {
      const results = await this.db
        .select()
        .from(buildings)
        .where(eq(buildings.type, type));
      
      return results;
    } catch (error) {
      throw new Error(`Failed to fetch buildings by type: ${error.message}`);
    }
  }

  async getBuildingsByManager(managerId: number) {
    try {
      const results = await this.db
        .select()
        .from(buildings)
        .where(eq(buildings.managerId, managerId));
      
      return results;
    } catch (error) {
      throw new Error(`Failed to fetch buildings by manager: ${error.message}`);
    }
  }

  async getBuildingStats(buildingId: number) {
    try {
      const building = await this.getBuildingById(buildingId);
      if (!building) {
        throw new Error('Building not found');
      }

      return {
        building: {
          id: building.id,
          name: building.name,
          totalUnits: building.totalUnits,
          status: building.status,
        },
        // These would come from other tables when you create them
        occupiedUnits: 0, // Would query units table
        vacantUnits: building.totalUnits, // Would calculate from units table
        totalRevenue: 0, // Would calculate from payments table
        maintenanceRequests: 0, // Would query maintenance table
      };
    } catch (error) {
      throw new Error(`Failed to fetch building stats: ${error.message}`);
    }
  }

  async getBuildingUnits(buildingId: number) {
    try {
      // This would query the units table when you create it
      // For now, return empty array
      return [];
    } catch (error) {
      throw new Error(`Failed to fetch building units: ${error.message}`);
    }
  }

  async addUnitToBuilding(buildingId: number, unitData: any, userId: number) {
    try {
      // This would insert into the units table when you create it
      return { message: 'Unit would be added here', buildingId, unitData };
    } catch (error) {
      throw new Error(`Failed to add unit to building: ${error.message}`);
    }
  }

  async updateBuildingStatus(buildingId: number, status: string, userId: number) {
    try {
      const [updatedBuilding] = await this.db
        .update(buildings)
        .set({ status, updatedAt: new Date() })
        .where(eq(buildings.id, buildingId))
        .returning();
      
      return updatedBuilding;
    } catch (error) {
      throw new Error(`Failed to update building status: ${error.message}`);
    }
  }

  async uploadBuildingImage(buildingId: number, imageUrl: string, userId: number) {
    try {
      const [updatedBuilding] = await this.db
        .update(buildings)
        .set({ imageUrl, updatedAt: new Date() })
        .where(eq(buildings.id, buildingId))
        .returning();
      
      return updatedBuilding;
    } catch (error) {
      throw new Error(`Failed to upload building image: ${error.message}`);
    }
  }

  async bulkUpdateBuildings(buildingsData: any[], userId: number) {
    try {
      const results: any[] = [];
      for (const buildingData of buildingsData) {
        const [updated] = await this.db
          .update(buildings)
          .set({ ...buildingData, updatedAt: new Date() })
          .where(eq(buildings.id, buildingData.id))
          .returning();
        results.push(updated);
      }
      
      return results;
    } catch (error) {
      throw new Error(`Failed to bulk update buildings: ${error.message}`);
    }
  }

  async bulkDeleteBuildings(buildingIds: number[], userId: number) {
    try {
      const results: { id: number; deleted: boolean }[] = [];
      for (const id of buildingIds) {
        await this.db
          .delete(buildings)
          .where(eq(buildings.id, id));
        results.push({ id, deleted: true });
      }
      
      return { message: `Deleted ${buildingIds.length} buildings`, results };
    } catch (error) {
      throw new Error(`Failed to bulk delete buildings: ${error.message}`);
    }
  }

  async deleteBuildingImage(buildingId: number, imageId: number, userId: number) {
    try {
      // This would handle image deletion from storage and update DB
      const [updatedBuilding] = await this.db
        .update(buildings)
        .set({ imageUrl: null, updatedAt: new Date() })
        .where(eq(buildings.id, buildingId))
        .returning();
      
      return updatedBuilding;
    } catch (error) {
      throw new Error(`Failed to delete building image: ${error.message}`);
    }
  }
}
