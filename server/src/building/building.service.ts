import { Inject, Injectable } from '@nestjs/common';
import { buildings, units } from '../db/schema';
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
      const buildingUnits = await this.db
        .select()
        .from(units)
        .where(eq(units.buildingId, buildingId));
      
      return buildingUnits;
    } catch (error) {
      throw new Error(`Failed to fetch building units: ${error.message}`);
    }
  }

  async addUnitToBuilding(buildingId: number, unitData: any, userId: number) {
    try {
      const [newUnit] = await this.db
        .insert(units)
        .values({ 
          ...unitData, 
          buildingId, 
          createdAt: new Date(), 
          updatedAt: new Date() 
        })
        .returning();
      
      return newUnit;
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

  async seedBuildingWithUnits(buildingId: number) {
    try {
      const building = await this.getBuildingById(buildingId);
      if (!building) {
        throw new Error('Building not found');
      }

      const sampleUnits: any[] = [];
      const totalUnits = building.totalUnits || 3;
      
      for (let i = 1; i <= Math.min(totalUnits, 5); i++) {
        const floor = Math.ceil(i / 2);
        const unitNumber = `${String.fromCharCode(64 + Math.ceil(i / 2))}${((i - 1) % 2) + 1}01`;
        
        sampleUnits.push({
          buildingId,
          name: unitNumber,
          type: building.type.toLowerCase(),
          status: i <= 2 ? 'occupied' : 'vacant',
          squareFootage: building.type === 'residential' ? 800 + (i * 50) : 1200 + (i * 100),
          bedrooms: building.type === 'residential' ? (i <= 2 ? 2 : 3) : 0,
          bathrooms: building.type === 'residential' ? (i <= 2 ? 1 : 2) : 1,
          floor,
          rent: building.type === 'residential' ? 1000 + (i * 200) : 2000 + (i * 300),
          deposit: building.type === 'residential' ? 2000 + (i * 400) : 4000 + (i * 600),
          tenant: i <= 2 ? `Tenant ${i}` : null,
          tenantEmail: i <= 2 ? `tenant${i}@email.com` : null,
          tenantPhone: i <= 2 ? `555-010${i}` : null,
          leaseStart: i <= 2 ? new Date('2024-01-01') : null,
          leaseEnd: i <= 2 ? new Date('2024-12-31') : null,
        });
      }

      const insertedUnits = await this.db
        .insert(units)
        .values(sampleUnits)
        .returning();
      
      return insertedUnits;
    } catch (error) {
      throw new Error(`Failed to seed building with units: ${error.message}`);
    }
  }
}
