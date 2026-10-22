import 'package:flutter/material.dart';

/// Categorie fisse: gli stessi codici del backend, icone Material.
class CategoryInfo {
  const CategoryInfo(this.code, this.label, this.icon, this.color);

  final String code;
  final String label;
  final IconData icon;
  final Color color;
}

const categories = <CategoryInfo>[
  CategoryInfo('food', 'Cibo', Icons.restaurant_outlined, Color(0xFFB4653A)),
  CategoryInfo('groceries', 'Spesa', Icons.shopping_basket_outlined, Color(0xFF6E8B3D)),
  CategoryInfo('transport', 'Trasporti', Icons.directions_bus_outlined, Color(0xFF477C9B)),
  CategoryInfo('home', 'Casa', Icons.home_outlined, Color(0xFF8A6A4F)),
  CategoryInfo('travel', 'Viaggi', Icons.flight_takeoff_outlined, Color(0xFF5B6FA8)),
  CategoryInfo('fun', 'Svago', Icons.celebration_outlined, Color(0xFFA45B7E)),
  CategoryInfo('health', 'Salute', Icons.medical_services_outlined, Color(0xFFB24A4A)),
  CategoryInfo('shopping', 'Acquisti', Icons.shopping_bag_outlined, Color(0xFF9A6B2F)),
  CategoryInfo('bills', 'Bollette', Icons.receipt_long_outlined, Color(0xFF5F8D6E)),
  CategoryInfo('other', 'Altro', Icons.more_horiz, Color(0xFF7A847D)),
];

CategoryInfo categoryInfo(String? code) {
  for (final c in categories) {
    if (c.code == code) return c;
  }
  return categories.last;
}
