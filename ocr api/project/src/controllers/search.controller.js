import { searchService } from '../services/search.service.js';

export const search = async (req, res, next) => {
  try {
    const { query, page = 1, limit = 10, tags, userId } = req.body;
    
    const from = (page - 1) * limit;
    const response = await searchService.search(query, {
      from,
      size: limit,
      filters: { tags, userId }
    });

    res.json({
      success: true,
      data: {
        hits: response.hits.hits,
        total: response.hits.total.value,
        page,
        pages: Math.ceil(response.hits.total.value / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};