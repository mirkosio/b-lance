import 'package:flutter/material.dart';

import '../api.dart';
import '../models.dart';
import '../ui.dart';

/// Avatar del membro: foto se caricata, altrimenti iniziale con il colore
/// scelto. La foto arriva dall'API con il token dell'app, non da un URL pubblico.
class AvatarImage extends StatelessWidget {
  const AvatarImage({
    super.key,
    required this.api,
    required this.userId,
    required this.name,
    required this.color,
    this.info,
    this.size = 40,
  });

  final Api api;
  final int userId;
  final String name;
  final String color;
  final AvatarInfo? info;
  final double size;

  @override
  Widget build(BuildContext context) {
    final bg = info?.background ?? color;
    final fallback = CircleAvatar(
      radius: size / 2,
      backgroundColor: parseHexColor(bg),
      child: Text(
        name.isEmpty ? '?' : name.characters.first.toUpperCase(),
        style: TextStyle(
          color: Colors.white,
          fontSize: size * 0.42,
          fontWeight: FontWeight.w800,
        ),
      ),
    );
    if (info == null || !info!.hasPhoto) return fallback;
    return ClipOval(
      child: Image.network(
        '${api.base}/api/avatar/$userId',
        width: size,
        height: size,
        fit: BoxFit.cover,
        headers: {'Authorization': 'Bearer ${api.token ?? ''}'},
        errorBuilder: (_, _, _) => fallback,
      ),
    );
  }
}
