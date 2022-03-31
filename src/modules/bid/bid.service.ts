import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Bid } from './entities/bid.entity';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,
  ) {}

  create(bid: Bid): Promise<Bid> {
    return this.bidRepository.save(bid);
  }

  findAll(): Promise<Bid[]> {
    return this.bidRepository.find();
  }

  findOne(id: number): Promise<Bid> {
    return this.bidRepository.findOne(id);
  }

  findByUserId(id: string): Promise<Bid[]> {
    return this.bidRepository.find({
      where: {
        user_id: id,
      },
    });
  }

  async update(id: number, UpdateBidDto: UpdateBidDto): Promise<Bid> {
    const bid = await this.bidRepository.preload({
      id: id,
      ...UpdateBidDto,
    });
    if (!bid) {
      throw new NotFoundException(`Bid ${id} not found`);
    }
    return this.bidRepository.save(bid);
  }

  async delete(id: number): Promise<Bid> {
    const bid = await this.bidRepository.findOne(id);
    return this.bidRepository.remove(bid);
  }
}
